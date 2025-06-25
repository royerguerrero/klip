import { Icon } from "@iconify-icon/react";
import { Button } from "../../_components/ui/button";
import Link from "next/link";

// Data constants for better maintainability
const PAIN_POINTS = [
  {
    id: "lost-revenue",
    text: "Pierdes hasta 40% de citas por no poder agendar fuera de horario. Dinero que se va directo a la competencia",
  },
  {
    id: "customer-frustration",
    text: "Clientes frustrados cancelan por errores de horario - tu reputación se daña y pierdes referidos valiosos",
  },
  {
    id: "time-waste",
    text: "3-4 horas diarias perdidas en llamadas y WhatsApp - tiempo que podrías usar para hacer crecer tu negocio",
  },
  {
    id: "double-bookings",
    text: "Dobles reservas y cancelaciones de última hora te dejan con espacios vacíos y clientes enojados",
  },
  {
    id: "no-insights",
    text: "Sin datos de clientes no sabes quién repite, qué servicios venden más, ni cuándo volverán - decisiones a ciegas",
  },
  {
    id: "cash-flow-problems",
    text: "Pagos perdidos y facturas sin cobrar - tu flujo de caja se convierte en un desastre imposible de rastrear",
  },
  {
    id: "team-confusion",
    text: "Tu equipo trabaja con información desactualizada - errores, confusiones y clientes mal atendidos",
  },
  {
    id: "no-delegation",
    text: "No puedes delegar porque no tienes visibilidad - tienes que estar presente para todo o arriesgar el caos",
  },
] as const;

const BENEFITS = [
  {
    id: "delegate-with-control",
    text: "Delega tareas a tu equipo pero mantén control total - ves cada nueva cita, cliente y pago en tiempo real",
  },
  {
    id: "revenue-visibility",
    text: "Vista clara del dinero esperado - sabes exactamente cuánto vas a cobrar hoy, esta semana y este mes",
  },
  {
    id: "operational-overview",
    text: "Resumen completo de operaciones - desde tu celular ves el estado de todo tu negocio de un vistazo",
  },
  {
    id: "team-coordination",
    text: "Tu equipo trabaja de forma coordinada - todos ven la misma información y evitan conflictos de horario",
  },
  {
    id: "customer-insights",
    text: "Conoce a cada cliente nuevo al instante - historial, preferencias y valor potencial sin preguntar",
  },
  {
    id: "financial-control",
    text: "Control financiero sin complicaciones - pagos, facturas y reportes organizados automáticamente",
  },
  {
    id: "growth-focus",
    text: "Enfócate en hacer crecer tu negocio - las tareas operativas se manejan solas mientras tú vendes más",
  },
] as const;

const NAVIGATION_SECTIONS = [
  {
    id: "scheduling",
    href: "#scheduling",
    title: "Agendamiento",
    icon: "ph:calendar-blank-fill",
    color: "text-sky-500",
    description:
      "Organiza todos los agendamietos de tu equipo en un solo lugar",
  },
  {
    id: "catalog",
    href: "#catalog",
    title: "Catálogo",
    icon: "ph:cards-three-fill",
    color: "text-fuchsia-500",
    description:
      "Incrementa tus ventas y clientes con un canal de ventas online",
  },
  {
    id: "customers",
    href: "#customers",
    title: "Clientes",
    icon: "ph:users-three-fill",
    color: "text-rose-500",
    description:
      "Obten la informacion de futuros agendamientos y proximos pagos",
  },
  {
    id: "payments",
    href: "#payments",
    title: "Pagos",
    icon: "ph:cash-register-fill",
    color: "text-lime-500",
    description:
      "Las cuentas claras y el chocolate espeso. Recibe pagos y cobra",
  },
] as const;

interface ComparisonItemProps {
  icon: string;
  text: string;
  iconColor: string;
}

function ComparisonItem({ icon, text, iconColor }: ComparisonItemProps) {
  return (
    <li className="flex items-start gap-2">
      <Icon
        icon={icon}
        height={16}
        className={`${iconColor} flex-shrink-0 mt-0.5`}
        aria-hidden="true"
      />
      <span className="leading-tight">{text}</span>
    </li>
  );
}

interface NavigationSectionProps {
  href: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}

function NavigationSection({
  href,
  title,
  icon,
  color,
  description,
}: NavigationSectionProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 items-center tracking-tight hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-lg p-2"
      aria-label={`Ir a sección de ${title.toLowerCase()}`}
    >
      <Icon icon={icon} height={24} className={color} />
      <h2 className="font-semibold">{title}</h2>
      <p className="font-medium text-neutral-500 text-sm leading-snug text-center text-balance">
        {description}
      </p>
    </Link>
  );
}

export default function ComparisonSection() {
  return (
    <section
      className="scroll-mt-24 max-w-[1200px] m-auto px-4 w-full space-y-10"
      aria-labelledby="comparison-heading"
    >
      <header className="flex flex-col gap-1 text-center">
        <h2
          id="comparison-heading"
          className="text-2xl md:text-3xl font-semibold tracking-tight text-primary"
        >
          Del caos al orden
        </h2>
        <h3 className="text-5xl font-semibold tracking-tight text-balance">
          Transformando tus operaciones
        </h3>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="flex flex-col gap-4 bg-muted/60 p-4 border rounded-xl">
          <h3 className="text-xl font-semibold tracking-tight">
            El dolor de la gestión tradicional sin Klip
          </h3>
          <ul className="flex flex-col gap-3 text-muted-foreground" role="list">
            {PAIN_POINTS.map((point) => (
              <ComparisonItem
                key={point.id}
                icon="ph:x-circle-fill"
                text={point.text}
                iconColor="text-neutral-500"
              />
            ))}
          </ul>
        </article>

        <article className="flex flex-col gap-4 bg-muted/60 p-4 border rounded-xl">
          <h3 className="text-xl font-semibold tracking-tight">
            Todo lo que Klip ofrece a tu negocio
          </h3>
          <ul className="flex flex-col gap-3 text-muted-foreground" role="list">
            {BENEFITS.map((benefit) => (
              <ComparisonItem
                key={benefit.id}
                icon="ph:seal-check-fill"
                text={benefit.text}
                iconColor="text-green-500"
              />
            ))}
          </ul>
          <Button
            className="font-semibold text-base mt-3 rounded-lg"
            size="lg"
            variant="primary"
            asChild
          >
            <Link href="admin/signup">
              Empezar ahora
              <Icon icon="ph:caret-right-bold" height={16} aria-hidden="true" />
            </Link>
          </Button>
        </article>
      </div>

      <nav
        className="flex justify-center items-center gap-4 mx-auto"
        aria-label="Navegación a secciones principales"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {NAVIGATION_SECTIONS.map((section) => (
            <NavigationSection
              key={section.id}
              href={section.href}
              title={section.title}
              icon={section.icon}
              color={section.color}
              description={section.description}
            />
          ))}
        </div>
      </nav>
    </section>
  );
}
