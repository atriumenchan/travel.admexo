// ---------------------------------------------------------------------------
// Generic multi-key rotation pool.
//
// Lets a provider be configured with one *or several* API keys (comma
// separated in the env var). Keys are tried round-robin so load spreads
// across all of them, and any key that gets rate-limited (429) is put on a
// short cooldown and skipped until another rotation picks it back up. This
// is what lets us pool quota across multiple RapidAPI/SerpApi subscriptions
// instead of being capped by a single key's limit.
// ---------------------------------------------------------------------------

export class RateLimitError extends Error {}

interface KeyState {
  key: string;
  cooldownUntil: number;
}

export class KeyPool {
  private keys: KeyState[];
  private cursor = 0;

  constructor(envValue: string | undefined | null) {
    this.keys = (envValue ?? "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
      .map((key) => ({ key, cooldownUntil: 0 }));
  }

  get size(): number {
    return this.keys.length;
  }

  hasKeys(): boolean {
    return this.keys.length > 0;
  }

  private markRateLimited(key: string, cooldownMs = 60_000) {
    const state = this.keys.find((k) => k.key === key);
    if (state) state.cooldownUntil = Date.now() + cooldownMs;
  }

  /**
   * Calls `fn(key)` once per available key, in rotating order, until one
   * call succeeds. If `fn` throws a `RateLimitError`, that key is put on
   * cooldown and the next key is tried automatically. Any other error is
   * thrown immediately (it's not a quota problem, retrying with a
   * different key won't help).
   */
  async withRotation<T>(fn: (key: string) => Promise<T>): Promise<T> {
    if (!this.hasKeys()) throw new Error("No API keys configured for this provider");

    const now = Date.now();
    const n = this.keys.length;
    const ordered = Array.from({ length: n }, (_, i) => this.keys[(this.cursor + i) % n]);
    const fresh = ordered.filter((k) => k.cooldownUntil <= now);
    const tryOrder = fresh.length > 0 ? fresh : ordered; // all cooling down: best effort anyway

    let lastError: unknown = null;
    for (const state of tryOrder) {
      try {
        const result = await fn(state.key);
        this.cursor = (this.keys.indexOf(state) + 1) % n;
        return result;
      } catch (e) {
        lastError = e;
        if (e instanceof RateLimitError) {
          this.markRateLimited(state.key);
          continue;
        }
        throw e;
      }
    }
    throw lastError instanceof Error ? lastError : new Error("All API keys for this provider failed");
  }
}
