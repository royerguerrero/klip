import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../_components/ui/accordion";
import Link from "next/link";

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 w-full">
      <div className="flex flex-col gap-3 p-4 py-12 rounded-xl bg-muted/60">
        <h2 className="text-4xl font-semibold text-center tracking-tight">
          Preguntas frecuentes
        </h2>
        <p className="text-muted-foreground/80 text-center font-semibold">
          Si no encuentras la respuesta que buscas, escribe a{" "}
          <Link
            href="mailto:support@klip.is"
            className="text-primary/90 font-semibold"
          >
            support@klip.is
          </Link>
        </p>
        <Accordion
          type="single"
          collapsible
          className="border rounded-xl mt-3 w-[1200px] bg-background mx-auto"
        >
          <AccordionItem value="item-1" className="px-4">
            <AccordionTrigger className="font-semibold text-base">
              ¿Qué es Klip?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Klip es un software de gestión para negocios de servicios. Te
              permite organizar tus reservas, pagos, servicios y clientes
              desde un solo lugar, sin necesidad de conocimientos técnicos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="px-4">
            <AccordionTrigger className="font-semibold text-base">
              ¿Puedo llevar mis citas y reservas con Klip?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Sí. Klip incluye un sistema de reservas para negocios de
              servicios que te ayuda a agendar citas, evitar cruces y llevar
              el control de tu disponibilidad. Tus clientes pueden agendar
              directamente desde internet si lo activas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="px-4">
            <AccordionTrigger className="font-semibold text-base">
              ¿Puedo gestionar pagos con Klip?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Claro. Con Klip puedes registrar pagos, hacer seguimiento de
              ingresos y visualizar tu salud financiera fácilmente. También
              puedes ver quién pagó, cuánto debes recibir y generar reportes
              simples para tu contabilidad.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="px-4">
            <AccordionTrigger className="font-semibold text-base">
              ¿Cómo me ayuda Klip a manejar a mis clientes?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Cada cliente queda registrado con su historial de reservas,
              pagos y servicios recibidos. Puedes ver quiénes son tus
              mejores clientes, quién no ha vuelto y qué servicios
              prefieren.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="px-4">
            <AccordionTrigger className="font-semibold text-base">
              ¿Necesito tener una página web para usar Klip?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              No necesitas una página web. Klip te da un enlace
              personalizado con tu catálogo de servicios y opciones de
              agendamiento. Si ya tienes página, puedes integrar ese enlace
              fácilmente.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="px-4">
            <AccordionTrigger className="font-semibold text-base">
              ¿Klip es solo para salones de belleza?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              No. Klip está diseñado para todo tipo de negocios de
              servicios: coaches, consultores, centros de bienestar,
              barberos, terapeutas, nutricionistas, freelancers, equipos
              pequeños… Si ofreces un servicio, Klip es para ti.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7" className="px-4">
            <AccordionTrigger className="font-semibold text-base">
              ¿Cómo empiezo?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              Solo necesitas crear una cuenta con tu nombre y correo. No
              pedimos tarjeta. En minutos puedes comenzar a cargar tus
              servicios, clientes y empezar a recibir reservas.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
} 