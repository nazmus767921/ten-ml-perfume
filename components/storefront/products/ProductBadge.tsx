type BadgeVariant = "sales" | "premium" | "new";

interface ProductBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const badgeConfig: Record<BadgeVariant, { label: string; className: string }> = {
  sales: {
    label: "% SALES",
    className: "bg-red-500 text-white text-xs font-bold tracking-wide px-1.5 py-0.5",
  },
  premium: {
    label: "PREMIUM",
    className: "bg-primary text-primary-foreground text-xs font-bold tracking-wide px-1.5 py-0.5",
  },
  new: {
    label: "NEW",
    className: "bg-white text-foreground text-xs font-bold tracking-wide px-1.5 py-0.5",
  },
};

export default function ProductBadge({ variant, className = "" }: ProductBadgeProps) {
  const config = badgeConfig[variant];
  return (
    <span className={`inline-block ${config.className} ${className}`}>
      {config.label}
    </span>
  );
}
