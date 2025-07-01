import { Stat } from "@/app/_components/ui/stat";

export default async function Page() {
  const stats = [
    {
      title: "Ingresos Semanales",
      percentage: -10,
      value: 2600000,
      format: "price",
    },
    {
      title: "Ingresos Diarios",
      percentage: 200,
      value: 112900,
      format: "price",
    },
    {
      title: "Ordenes Nuevas",
      percentage: -2,
      value: 64,
      format: "number",
    },
    {
      title: "Clientes Nuevos",
      percentage: 3,
      value: 12,
      format: "number",
    },
  ];

  return (
    <section className="px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {stats.map((stat, index) => (
          <Stat
            key={stat.title}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
            format={stat.format as "price" | "number" | "currency"}
            className={`border-r ${
              index === stats.length - 1 ? "" : "last:border-r-0"
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
      </div>
    </section>
  );
}
