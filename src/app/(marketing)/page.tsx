import Header from "./_components/header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="h-[36vh] max-w-[1200px] border-x border-netural-100 p-2 flex flex-col gap-6 items-center justify-center mx-auto text-center">
        <h1 className="text-5xl tracking-tighter font-semibold w-5/6">
          Klip mantiene en orden tus agendamientos, pagos e interaciones con tus
          clientes
        </h1>
        <p className="tracking-tight text-neutral-500 font-medium w-4/6">
          Usando Klip las empresas logran centralizar sus agendamientos,
          interacciones con sus clientes y pagos. Logrando tener sus servicios
          en internet pemitiendo crecer sus operaciones
        </p>
      </section>
      <section className="h-[50vh]">
        <div className="max-w-[1200px] border-x border-netural-100 m-auto p-3">
          Filters
        </div>
        <div className="border-t bg-sky-50 h-full grid items-center">
          <div className="w-5/6 mx-auto aspect-video p-3">
            <div className="border h-full rounded-xl bg-white"></div>
          </div>
        </div>
      </section>
      <footer className=""></footer>
    </>
  );
}
