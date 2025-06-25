import { Button } from "@/app/_components/ui/button";
import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { retrieveCustomer } from "../_lib/data";
import { notFound } from "next/navigation";
import { Heading } from "../../_components/heading";

type Props = {
  params: Promise<{
    teamId: string;
    id: string;
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
        <article className="border rounded-lg p-3">
          Frecuencia de agendamiento
        </article>
        <article className="border rounded-lg p-3">Health Score</article>
      </section>
      <div className="grid grid-cols-2 gap-3">
        <section className="px-4 flex flex-col gap-4">
          <h2 className="font-semibold text-secondary-foreground">Ordenes</h2>
          Table
        </section>
        <section className="px-4 flex flex-col gap-4">
          <h2 className="font-semibold text-secondary-foreground">Pagos</h2>
          Table
        </section>
      </div>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="font-semibold text-secondary-foreground">
          Agendamientos
        </h2>
        Table
      </section>
    </>
  );
}
