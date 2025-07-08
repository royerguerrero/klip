import { formatPrice } from "@/app/_lib/utils";

type Props = {
  title: string;
  description: string;
  start: string;
  end: string;
  price: number;
};

export default function Event({
  title,
  description,
  start,
  end,
  price,
}: Props) {
  return (
    <div className="flex flex-col gap-1 p-1 rounded-lg w-[280px] min-w-[280px] overflow-x-auto pb-2 bg-background border border-neutral-100">
      <article className="flex gap-6 text-sm p-2 rounded-md w-fill justify-between h-full bg-sky-100 text-sky-500">
        <div className="flex flex-col">
          <h2 className="font-semibold leading-none flex gap-1">{title}</h2>
          <p>{description}</p>
        </div>
      </article>
      <div className="flex justify-between items-center text-xs px-1 text-neutral-400 gap-6 uppercase">
        <p className="text-green-600 font-semibold">±{formatPrice(price)}</p>
        <div className="flex gap-1">
          <time>{start}</time>
          <span>-</span>
          <time>{end}</time>
        </div>
      </div>
    </div>
  );
}
