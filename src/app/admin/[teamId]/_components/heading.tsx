import { cn } from "@/app/_lib/utils";
import { ReactNode } from "react";

type Props = {
  title: string | ReactNode;
  className?: string;
  children?: ReactNode;
};

export function Heading({ title, children, className }: Props) {
  return (
    <header className={cn("flex justify-between items-center", className)}>
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <div className="flex gap-2 items-center">{children}</div>
    </header>
  );
}
