import { ListMagnifyingGlass } from "@phosphor-icons/react/dist/ssr";



export default async function Page() {
  return (
    <main className="space-y-3 w-full md:max-w-[520px] mx-auto px-3 md:px-0">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-neutral-500">
          Lunes
        </h2>
      </div>
      <nav>Coming days</nav>
      <section className="grid place-items-center text-center text-neutral-500 py-3">
        <ListMagnifyingGlass size={48} />
        <h3 className="font-semibold">
          No tienes agendamientos para este día
        </h3>
        <p className="text-sm">
          Descubre nuestros servicios y agenda
        </p>
      </section>
    </main>
  );
}
