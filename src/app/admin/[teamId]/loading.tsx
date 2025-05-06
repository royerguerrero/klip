import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <section className="p-3 flex flex-col gap-3">
      <Skeleton className="w-full h-12 rounded-2xl" />
      <Skeleton className="w-full h-[600px] rounded-2xl" />
    </section>
  );
}
