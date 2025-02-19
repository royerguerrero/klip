type Props = {
  params: Promise<{ fingerprint: string }>;
};

export default async function Page({ params }: Props) {
  const fingerprint = (await params).fingerprint;
  const service = {
    fingerprint: fingerprint,
    title: "Tecnico en Barberia",
    description:
      "Domina cortes, afeitados y estilos contemporáneos, ofreciendo un servicio de barbería moderno e integral.",
  };

  return (
    <main className="md:w-4/6 6 md:max-w-[600px] md:mx-auto p-3 flex flex-col gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight leading-tight">
          {service.title}
        </h1>
        <p className="text-neutral-500 text-sm leading-4 line-clamp-2 pt-1">
          {service.description}
        </p>
      </div>
    </main>
  );
}
