export default function Page() {
  const teams = [
    {
      id: "",
      name: "Team Name",
      members: {},
    },
  ];

  return (
    <div className="px-4 flex flex-col gap-3">
      <section>
        <h2 className="font-semibold text-xl tracking-tight leading-none">
          Equipos
        </h2>
        <p className="text-sm text-neutral-400 font-medium pt-0.5">
          Gestiona a tus colaboradores
        </p>
      </section>
      <section className="grid grid-cols-3 gap-2">
        {teams.map((team) => (
          <div key={team.id} className="border rounded-lg bg-neutral-100 p-3">
            <h2 className="font-semibold tracking-tight">{team.name}</h2>
          </div>
        ))}
      </section>
    </div>
  );
}
