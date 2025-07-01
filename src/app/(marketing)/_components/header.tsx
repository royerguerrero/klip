"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/app/_components/ui/navigation-menu";
import { Icon } from "@iconify/react";

import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import Link from "next/link";

function ListItem({
  title,
  children,
  href,
  icon,
  iconClassName,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon?: string;
  iconClassName?: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="flex flex-row gap-2">
          {icon && (
            <Icon
              icon={icon}
              height={18}
              className={`flex-shrink-0 ${
                iconClassName || "text-muted-foreground"
              }`}
            />
          )}
          <div className="space-y-1">
            <h3 className="text-sm leading-none font-medium">{title}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-4">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function Header() {
  const useCases = [
    {
      title: "Salones de belleza y barberías",
      href: "/blog/use-cases/beauty-salon",
      description:
        "Permite que tus clientes se agenden solos y mantén tu catálogo siempre actualizado. Lleva control de pagos pendientes, facturas y recibos en un solo lugar.",
      icon: "ph:scissors-fill",
      iconClassName: "text-fuchsia-500",
    },
    {
      title: "Entrenadores personales y coaches",
      href: "/blog/use-cases/personal-trainer",
      description:
        "Organiza tus sesiones, registra pagos y haz seguimiento al progreso de tus clientes. Klip te ayuda a mantener el control total de tu negocio.",
      icon: "ph:barbell-fill",
      iconClassName: "text-amber-500",
    },
    {
      title: "Mentores y centros educativos",
      href: "/blog/use-cases/education",
      description:
        "Gestiona clases, alumnos y servicios educativos. Registra facturas, recibos y controla quién ha pagado y quién no, sin complicarte.",
      icon: "ph:book-bookmark-fill",
      iconClassName: "text-sky-500",
    },
    {
      title: "Servicios profesionales y técnicos",
      href: "/blog/use-cases/professional-services",
      description:
        "Lleva el control de tus servicios prestados, clientes y pagos manuales. Klip te permite registrar facturas y recibos para tener siempre claridad financiera.",
      icon: "ph:gear-six-fill",
      iconClassName: "text-emerald-500",
    },
  ];

  const platformItems = [
    {
      title: "Agendamiento",
      href: "/#scheduling",
      description: "Gestiona citas y horarios.",
      icon: "ph:calendar-blank-fill",
      iconClassName: "text-sky-500",
    },
    {
      title: "Catálogo",
      href: "/#catalog",
      description: "Organiza y muestra tus servicios.",
      icon: "ph:cards-three-fill",
      iconClassName: "text-fuchsia-500",
    },
    {
      title: "Clientes",
      href: "/#customers",
      description: "Administra tu base de datos de clientes.",
      icon: "ph:users-three-fill",
      iconClassName: "text-rose-500",
    },
    {
      title: "Finanzas",
      href: "/#finances",
      description: "Controla ingresos, gastos y reportes.",
      icon: "ph:bank-fill",
      iconClassName: "text-lime-500",
    },
  ];
  const contactLink = `https://wa.me/573214896631?text=${encodeURIComponent(
    "Hola, me interesa conocer más sobre la plataforma"
  )}`;

  return (
    <header className="sticky top-0 bg-background/60 backdrop-blur-xl z-50 border-b">
      <div className="p-4 px-2 flex justify-between items-center gap-4 max-w-[1200px] m-auto">
        <Link href="/">
          <Image src="/klip-icon.svg" alt="Klip" width={34} height={34} />
        </Link>
        <div className="items-center gap-4 justify-between w-full hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-muted-foreground">
                  Plataforma
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-2">
                    {platformItems.map((item) => (
                      <ListItem
                        key={item.href}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                        iconClassName={item.iconClassName}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-muted-foreground">
                  Casos de uso
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {useCases.map((useCase) => (
                      <ListItem
                        key={useCase.href}
                        title={useCase.title}
                        href={useCase.href}
                        icon={useCase.icon}
                        iconClassName={useCase.iconClassName}
                      >
                        {useCase.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} text-muted-foreground`}
                >
                  <Link href="/#pricing">Precio</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} text-muted-foreground`}
                >
                  <Link href="/#faq">Preguntas frecuentes</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="space-x-2">
            <Button variant="ghost" asChild>
              <Link href={contactLink} target="_blank">
                Contactar con ventas
                <Icon icon="ph:caret-right" height={12} />
              </Link>
            </Button>
            <Button variant="secondary" className="font-bold" asChild>
              <Link href="/admin/login">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
