type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** When true, skips the global scroll-reveal class (use when a parent handles animation). */
  suppressReveal?: boolean;
};

export function SectionHeading({ eyebrow, title, description, suppressReveal = false }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl space-y-4 ${suppressReveal ? "" : "reveal"}`}>
      <p className="text-xs uppercase tracking-[0.35em] text-amber-300/90">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {description ? <p className="text-zinc-300/90 md:text-lg">{description}</p> : null}
    </div>
  );
}
