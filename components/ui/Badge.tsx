import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide",
  {
    variants: {
      variant: {
        solid: "bg-slate-900 text-white",
        brand: "bg-brand-50 text-brand-700 border border-brand-100",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
        accent: "bg-accent-50 text-accent-700 border border-accent-100",
        glass: "glass text-white",
        outline: "border border-slate-200 text-slate-600 bg-white",
      },
      size: {
        sm: "text-[11px] px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
      },
    },
    defaultVariants: { variant: "brand", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
