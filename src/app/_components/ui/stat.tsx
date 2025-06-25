import { formatPrice } from "@/app/_lib/utils";

interface StatProps {
  title: string;
  value: number;
  percentage: number;
  format?: "price" | "number" | "currency";
  className?: string;
}

export function Stat({
  title,
  value,
  percentage,
  format = "number",
  className = "",
}: StatProps) {
  return (
    <article className={`p-1 text-sm space-y-1 ${className}`}>
      <span className="text-xs uppercase font-semibold tracking-wide text-neutral-400">
        {title}
      </span>
      <div className="flex items-end gap-1.5 font-semibold text-xs leading-none">
        <h3 className="text-2xl font-bold tracking-tight">
          {format === "price" ? formatPrice(value) : `+${value}`}
        </h3>
        <span
          className={`text-sm leading-6 font-semibold ${
            percentage >= 0 ? "text-green-600" : "text-rose-500"
          }`}
        >
          {percentage >= 0 ? `+${percentage}` : percentage}%
        </span>
      </div>
    </article>
  );
}
