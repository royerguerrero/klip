import { retrieveCustomer } from "../_lib/data";

type Props = {
  params: Promise<{
    id: string;
    teamId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  await retrieveCustomer(id);

  return (
    <>
      <section className="px-4 grid grid-cols-5 gap-3">
        <article className="border rounded-lg p-3 col-span-2">
          Data Card
        </article>
        <article className="border rounded-lg p-3 ">CLV</article>
        <article className="border rounded-lg p-3">Frecuencia de agendamiento</article>
        <article className="border rounded-lg p-3">Health Score</article>
      </section>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="font-semibold text-secondary-foreground">
          Agendamientos
        </h2>
        Table
      </section>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="font-semibold text-secondary-foreground">Pagos</h2>
        Table
      </section>
    </>
  );
}
