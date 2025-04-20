type Props = {
  title: string | React.ReactNode;
  children?: React.ReactNode;
};

export default function Heading({ title, children }: Props) {
  return (
    <header className="flex justify-between w-full items-center px-3 py-2 pb-2">
      <h1 className="font-semibold text-xl tracking-tight leading-none capitalize">
        {title}
      </h1>
      <div className="flex gap-3 items-center">{children}</div>
    </header>
  );
}
