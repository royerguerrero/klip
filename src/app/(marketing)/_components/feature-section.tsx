import { Icon } from "@iconify/react/dist/iconify.js";

interface FeatureSectionProps {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
}

export default function FeatureSection({
  id,
  icon,
  iconColor,
  title,
  description,
}: FeatureSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 max-w-[1200px] m-auto px-4 w-full"
    >
      <span className={`flex items-center gap-2 font-semibold ${iconColor} uppercase tracking-wide text-sm leading-none`}>
        <Icon icon={icon} className="size-4" />
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </span>
      <h2 className="text-4xl font-semibold tracking-tight pt-2 text-balance w-5/6">
        {title}
      </h2>
      <p className="pt-3 text-muted-foreground/80 text-lg tracking-tight leading-tight font-semibold w-5/6 text-balance">
        {description}
      </p>
      <figure className="p-3 rounded-xl aspect-video w-full mt-6 bg-muted/60"></figure>
    </section>
  );
} 