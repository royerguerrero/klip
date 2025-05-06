import { cn } from "@heroui/react";
import { ReactNode } from "react";

type CardDetailProps = {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function CardDetail({
  title,
  children,
  action,
  className,
}: CardDetailProps) {
  return (
    <div className="p-1 rounded-xl bg-neutral-100 border flex flex-col gap-1">
      <div className="px-2 py-1 text-xs min-h-6 text-neutral-400 uppercase tracking-wide font-semibold flex items-center justify-between leading-none">
        {title}
        {action}
      </div>
      <div className={cn("bg-white p-3 rounded-xl text-sm", className)}>
        {children}
      </div>
    </div>
  );
}
