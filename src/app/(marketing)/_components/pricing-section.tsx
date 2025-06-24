"use client";

import { Icon } from "@iconify-icon/react";
import { Button } from "../../_components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/app/_lib/utils";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const monthlyPrice = 199999;
  const annualPrice = 166666;

  return (
    <section
      id="pricing"
      className="scroll-mt-24 max-w-[1200px] m-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight pt-2 text-balance text-primary">
            Un plan, un unico precio{" "}
            <span className="block text-foreground">
              Todo listo en segundos
            </span>
          </h2>
          <p className="pt-3 text-muted-foreground/80 text-lg tracking-tight leading-tight font-semibold text-balance self-end">
            Empieza con todo en orden desde el día uno. Paga por equipo, mes a
            mes o{" "}
            <span className="text-foreground">ahorra con el plan anual.</span>
          </p>
        </div>
        <div className="p-3 bg-muted/60 rounded-xl space-y-3 border">
          <p className="text-muted-foreground tracking-tight leading-tight font-semibold text-balance">
            &ldquo;Usando Klip hemos logrado digitalizar por completo nuestras
            matrículas y el registro de pagos, dejando atrás el papeleo manual.
            Ahora vemos al instante los pagos pendientes, tenemos un control
            total sobre los abonos de cada estudiante y podemos hacer crecer
            nuestras operaciones sin aumentar el personal. Klip nos ha
            proporcionado la organización y transparencia necesarias para poder
            crecer&rdquo;
          </p>
          <p className="text-muted-foreground/60 tracking-tight leading-tight font-semibold text-balance pt-12">
            Oliva Pinilla - Directora en la Academia de Belleza Patry Ritchy
          </p>
        </div>
      </div>
      <div className="bg-muted/60 p-3 rounded-2xl flex flex-col gap-1 border">
        <div className="border rounded-xl p-3 relative overflow-hidden text-primary-foreground flex flex-col justify-between aspect-video">
          <div
            className={`absolute inset-0 bg-gradient-to-t from-primary to-primary/40 transition-opacity duration-300 ${
              isAnnual ? "opacity-100" : "opacity-0"
            }`}
          ></div>
          <div
            className={`absolute inset-0 bg-gradient-to-tl from-primary to-primary/40 transition-opacity duration-300 ${
              isAnnual ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-end gap-2 items-center">
              <div className="flex items-center text-sm text-muted">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                    !isAnnual
                      ? "bg-muted text-foreground"
                      : "text-muted hover:text-foreground/80"
                  }`}
                >
                  Mensual
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                    isAnnual
                      ? "bg-muted text-foreground"
                      : "text-muted hover:text-foreground/80"
                  }`}
                >
                  Anual
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-2 items-start md:items-end">
              <h2 className="text-4xl font-semibold tracking-tight leading-none">
                Plan {isAnnual ? "Anual" : "Mensual"}
              </h2>
              <div className="flex flex-col gap-1 items-start md:items-end">
                <span className="text-sm tracking-tight font-medium leading-none">
                  Precio mensual por equipo
                </span>
                <div className="flex items-center gap-2">
                  {isAnnual && (
                    <h4 className="text-2xl font-bold text-primary-foreground/60 tracking-tight leading-none line-through">
                      {formatPrice(monthlyPrice)}
                    </h4>
                  )}
                  <h3 className="text-3xl font-semibold tracking-tight leading-none">
                    {formatPrice(isAnnual ? annualPrice : monthlyPrice)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="font-semibold text-base"
          size="lg"
          variant="primary"
          asChild
        >
          <Link href="/admin/signup">
            Empezar ahora ― {formatPrice(isAnnual ? annualPrice : monthlyPrice)}
          </Link>
        </Button>
        <div className="p-3 space-y-6">
          <h3 className="font-medium text-muted-foreground ">
            Una plataforma ideal para mantener en orden tu negocio
          </h3>
          <ul className="flex flex-col gap-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:seal-check-fill"
                height={20}
                className="flex-shrink-0 text-primary"
              />
              <span className="leading-tight">
                Tu operación unificada - agendamiento, tus clientes, pagos
                pendientes y más. En una sola plataforma.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:seal-check-fill"
                height={20}
                className="flex-shrink-0 text-primary"
              />
              <span className="leading-tight">
                Automatiza reservas, evita dobles citas, envía recordatorios y
                permite que tus clientes agenden solos 24/7.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:seal-check-fill"
                height={20}
                className="flex-shrink-0 text-primary"
              />
              <span className="leading-tight">
                Define roles, asigna accesos granulares y gestiona múltiples
                ubicaciones o equipos con total seguridad.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:seal-check-fill"
                height={20}
                className="flex-shrink-0 text-primary"
              />
              <span className="leading-tight">
                Controla pagos pendientes, vincula facturas y recibos, sigue las
                tendencias de ingresos y obtén reportes sencillos para impulsar
                tu crecimiento.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="ph:seal-check-fill"
                height={20}
                className="flex-shrink-0 text-primary"
              />
              <span className="leading-tight">
                Soporte para resolver cualquier duda o problema
              </span>
            </li>
          </ul>
          <Link
            href="/admin/signup"
            className="font-medium text-muted-foreground"
          >
            Listo, para transfromar tus operaciones.{" "}
            <span className="text-foreground">Crear tu cuenta</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
