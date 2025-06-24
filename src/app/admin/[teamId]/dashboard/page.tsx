import { formatPrice } from "@/app/_lib/utils";

export default function Page() {
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
      title: "Agendamientos Nuevos",
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
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-1 text-sm border-r last:border-r-0 space-y-1"
          >
            <span className="text-xs uppercase font-semibold tracking-wide text-neutral-400">
              {stat.title}
            </span>
            <div className="flex items-end gap-1.5 font-semibold text-xs leading-none">
              <h3 className="text-2xl font-bold tracking-tight">
                {stat.format === "price"
                  ? formatPrice(stat.value)
                  : `+${stat.value}`}
              </h3>
              <span
                className={`text-sm leading-6 font-semibold ${
                  stat.percentage >= 0 ? "text-green-600" : "text-rose-500"
                }`}
              >
                {stat.percentage >= 0 ? `+${stat.percentage}` : stat.percentage}
                %
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
