import type { Metadata } from "next";
import Link from "next/link";
import ContentPage, { Section, Steps, Callout, BulletList, InfoTable } from "@/components/ContentPage";
import { SITE_NAME, SITE_TAGLINE, CAREERS_EMAIL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Careers",
  description: `Careers at ${SITE_NAME} — roles, values, and how to apply.`,
};

export default function CareersPage() {
  return (
    <ContentPage
      title="Careers"
      description={`Help build honest, useful flight comparison tools. ${SITE_TAGLINE}.`}
      wide
    >
      <Section title="Why work on SkyLerb">
        <p>
          Travel is one of the largest consumer categories online — and one of the most frustrating to shop for.{" "}
          {SITE_NAME} sits at the moment of decision: can we show real options clearly, explain what happens next, and
          never trick the user? That is the product problem we care about.
        </p>
        <p>
          We are small, pragmatic, and biased toward shipping helpful improvements over slide decks. If you like
          travel, consumer UX, and saying plainly what a product does not do, you may fit here.
        </p>
      </Section>

      <Section title="What we value">
        <InfoTable
          rows={[
            {
              label: "Honesty",
              value: "Clear disclaimers, no fake airline desks, no hidden booking flows.",
            },
            {
              label: "Usefulness",
              value: "Help content and UX that answer real traveler questions.",
            },
            {
              label: "Ownership",
              value: "See a broken redirect message? Fix it — do not wait for a ticket.",
            },
            {
              label: "Respect for users",
              value: "Comparison is a service, not a trap.",
            },
            {
              label: "Craft",
              value: "Fast search, readable mobile pages, accessible support content.",
            },
          ]}
        />
      </Section>

      <Section title="Teams & example responsibilities">
        <div className="space-y-4 not-prose">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="font-bold text-slate-900">Engineering</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Frontend (Next.js, React), search integrations, performance, analytics, reliability. You might improve
              widget load times, build comparison UI, or harden redirect tracking.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="font-bold text-slate-900">Product & design</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Search flows, mobile landing pages, results clarity, accessibility. You might prototype fare breakdown
              UI or simplify multi-passenger search.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="font-bold text-slate-900">Support & operations</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Help travelers use comparison tools, document FAQs, improve call scripts. You know when to say “call the
              airline” and how to say it kindly.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="font-bold text-slate-900">Partnerships</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Affiliate programs, travel data feeds, quality review of partner landing experiences.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="font-bold text-slate-900">Content & SEO</p>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Help Center, route pages, educational travel content that stays accurate and non-deceptive.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Open positions">
        <Callout tone="warn">
          <p>
            <strong>No roles are posted publicly right now.</strong> We still welcome general applications from strong
            candidates who want to work on travel comparison long term.
          </p>
        </Callout>
      </Section>

      <Section title="How to apply">
        <Steps
          items={[
            "Email careers@skylerb.com — subject: role you want or “General application”.",
            "Attach resume or LinkedIn plus links to work (GitHub, portfolio, writing samples).",
            "In 5–10 sentences, tell us why flight comparison interests you and one thing you would improve on SkyLerb.",
            "Include timezone, work authorization if relevant, and earliest start date.",
          ]}
        />
        <p className="pt-2">
          Send to{" "}
          <a href={`mailto:${CAREERS_EMAIL}`} className="text-brand-600 hover:underline font-medium">
            {CAREERS_EMAIL}
          </a>
        </p>
      </Section>

      <Section title="Interview process (typical)">
        <BulletList
          items={[
            "Intro — mutual fit, role scope, how SkyLerb works (15–30 min).",
            "Skills deep dive — past projects, code or portfolio review where applicable.",
            "Exercise — short practical task for some roles; kept bounded and paid when substantial.",
            "Team conversation — values, communication, remote collaboration.",
            "Offer — compensation, start date, equipment if applicable.",
          ]}
        />
      </Section>

      <Section title="Benefits & work style">
        <BulletList
          items={[
            "Remote-friendly for many roles — async communication with clear docs.",
            "Focus on sustainable pace; on-call only where truly operational.",
            "Direct access to product decisions — small team, short feedback loops.",
            "Specific benefits vary by role and contract type — discussed at offer stage.",
          ]}
        />
        <p className="pt-2">
          {SITE_NAME} — {SITE_TAGLINE}.{" "}
          <Link href="/about" className="text-brand-600 hover:underline font-medium">
            About us
          </Link>
        </p>
      </Section>
    </ContentPage>
  );
}
