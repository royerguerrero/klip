type Props = {
  title: string;
  description: string;
};

export default function Heading({ title, description }: Props) {
  return (
    <div className="flex flex-col gap-1 px-3 py-4">
      <h1 className="font-semibold text-xl tracking-tight leading-none">
        {title}
      </h1>
      <p className="text-neutral-500 text-sm leading-4">{description}</p>
    </div>
  );
}
