import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../../_components/ui/button";
import Link from "next/link";

export default function ComparisonSection() {
  return (
    <section className="scroll-mt-24 max-w-[1200px] m-auto px-4 w-full space-y-10">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary">
          Del caos al orden
        </h2>
        <h3 className="text-5xl font-semibold tracking-tight text-balance">
          Transformando tus operaciones
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 bg-muted/60 p-4 border rounded-xl">
          <h3 className="text-xl font-semibold tracking-tight">
            El dolor de la gestión tradicional sin Klip
          </h3>
          <ul className="flex flex-col gap-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:x-circle-fill"
                className="size-4 text-neutral-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Todo en papel o Excel citas y pagos apuntados a mano con
                alto riesgo de extravío
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:x-circle-fill"
                className="size-4 text-neutral-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Agendamientos por llamada o WhatsApp provoca errores, dobles
                reservas y cancelaciones de última hora
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:x-circle-fill"
                className="size-4 text-neutral-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Catálogo disperso guardado en PDFs, fotos o fichas impresas
                que quedan obsoletas al instante
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:x-circle-fill"
                className="size-4 text-neutral-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Gestión manual de pagos facturas impresas y recibos perdidos
                en montones de papeles
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:x-circle-fill"
                className="size-4 text-neutral-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Sin historial de clientes imposible saber quién repite, qué
                servicios prefiere o cuándo volverá
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:x-circle-fill"
                className="size-4 text-neutral-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Solo en horario de oficina no recibes citas fuera de tus
                horas de trabajo ni fines de semana
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:x-circle-fill"
                className="size-4 text-neutral-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Solo en horario de oficina no recibes citas fuera de tus
                horas de trabajo ni fines de semana
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:x-circle-fill"
                className="size-4 text-neutral-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Solo en horario de oficina no recibes citas fuera de tus
                horas de trabajo ni fines de semana
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 bg-muted/60 p-4 border rounded-xl">
          <h3 className="text-xl font-semibold tracking-tight">
            Todo lo que Klip ofrece a tu negocio
          </h3>
          <ul className="flex flex-col gap-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:seal-check-fill"
                className="size-4 text-green-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Acceso 24/7 desde donde quieras tu negocio disponible en web
                y móvil sin interrupciones
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:seal-check-fill"
                className="size-4 text-green-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Reservas online automáticas los clientes agendan solos y
                evitas choques de horario
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:seal-check-fill"
                className="size-4 text-green-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Catálogo siempre actualizado gestiona y muestra tus
                servicios al instante
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:seal-check-fill"
                className="size-4 text-green-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Control de pagos pendientes vincula facturas y recibos sin
                usar papel
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Icon
                icon="ph:seal-check-fill"
                className="size-4 text-green-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Perfil completo de cada cliente historial de citas,
                preferencias y pagos al alcance
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Icon
                icon="ph:seal-check-fill"
                className="size-4 text-green-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Ahorra tiempo elimina tareas repetitivas y enfócate en hacer
                crecer tu negocio
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Icon
                icon="ph:seal-check-fill"
                className="size-4 text-green-500 flex-shrink-0 mt-0.5"
              />
              <span className="leading-tight">
                Visibilidad financiera instantánea reportes en tiempo real
                para tomar mejores decisiones
              </span>
            </li>
          </ul>
          <Button
            className="font-semibold text-base mt-3 rounded-lg"
            size="lg"
            variant="primary"
            asChild
          >
            <Link href="admin/signup">
              Empezar ahora
              <Icon icon="ph:caret-right-bold" className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
      <nav className="flex justify-center items-center gap-4 mx-auto">
        <Link
          href="#scheduling"
          className="flex flex-col gap-2 bg-sky-50 py-2 px-4 rounded-lg"
        >
          <h2 className="flex items-center gap-2 font-semibold text-sky-500 uppercase tracking-wide text-sm leading-none">
            <Icon icon="ph:calendar-blank-fill" className="size-4" />
            Agendamiento
          </h2>
        </Link>
        <Link
          href="#catalog"
          className="flex flex-col gap-2 bg-fuchsia-50 py-2 px-4 rounded-lg"
        >
          <h2 className="flex items-center gap-2 font-semibold text-fuchsia-500 uppercase tracking-wide text-sm leading-none">
            <Icon icon="ph:cards-three-fill" className="size-4" />
            Catalogo
          </h2>
        </Link>
        <Link
          href="#customers"
          className="flex flex-col gap-2 bg-rose-50 py-2 px-4 rounded-lg"
        >
          <h2 className="flex items-center gap-2 font-semibold text-rose-500 uppercase tracking-wide text-sm leading-none">
            <Icon icon="ph:users-three-fill" className="size-4" />
            Clientes
          </h2>
        </Link>
        <Link
          href="#finances"
          className="flex flex-col gap-2 bg-lime-50 py-2 px-4 rounded-lg"
        >
          <h2 className="flex items-center gap-2 font-semibold text-lime-500 uppercase tracking-wide text-sm leading-none">
            <Icon icon="ph:wallet-fill" className="size-4" />
            Finanzas
          </h2>
        </Link>
      </nav>
    </section>
  );
} 