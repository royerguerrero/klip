"use client";

import { Button } from "@/app/_components/ui/button";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import Link from "next/link";
import { useOnboarding } from "@/app/admin/onboarding/_contexts/onboarding-context";
import { listOnboardingSteps } from "@/app/admin/onboarding/_lib/data";
import clsx from "clsx";
import { z } from "zod";
import CompanyForm from "@/app/admin/onboarding/_components/forms/company";
import TeamForm from "@/app/admin/onboarding/_components/forms/team";
import {
  companySchema,
  teamSchema,
} from "@/app/admin/onboarding/_components/forms/schemas";
import { logout } from "@/app/admin/(auth)/_lib/actions";
import { TeamId } from "@/contexts/organizations/domain/TeamId";

const ONBOARDING_FEATURES = [
  {
    id: "agenda",
    icon: "ph:calendar-blank-fill",
    iconColor: "text-sky-500",
    title: "¡Comienza a agendar!",
    description:
      "Organiza y programa todas tus citas y eventos de forma eficiente.",
    href: (teamId: string) => `/admin/${teamId}/agenda`,
  },
  {
    id: "customers",
    icon: "ph:users-three-fill",
    iconColor: "text-rose-500",
    title: "¡Conecta con tus clientes!",
    description:
      "Gestiona tu base de datos de clientes y fortalece las relaciones.",
    href: (teamId: string) => `/admin/${teamId}/customers`,
  },
  {
    id: "orders",
    icon: "ph:book-open-fill",
    iconColor: "text-orange-500",
    title: "¡Gestiona tus pedidos!",
    description:
      "Crea y administra todos los pedidos de tus clientes sin complicaciones.",
    href: (teamId: string) => `/admin/${teamId}/orders`,
  },
  {
    id: "finances",
    icon: "ph:bank-fill",
    iconColor: "text-lime-500",
    title: "¡Controla tus finanzas!",
    description:
      "Monitorea ingresos, gastos y mantén el control total de tu negocio.",
    href: (teamId: string) => `/admin/${teamId}/finances`,
  },
];

interface FeatureItemProps {
  feature: (typeof ONBOARDING_FEATURES)[0];
  teamId: string;
}

function FeatureItem({ feature, teamId }: FeatureItemProps) {
  return (
    <li className="bg-neutral-50 p-3 rounded-lg">
      <Link href={feature.href(teamId)} className="flex flex-row gap-3">
        <Icon
          icon={feature.icon}
          height={16}
          className={`flex-shrink-0 ${feature.iconColor}`}
        />
        <div className="space-y-1 text-start">
          <h3 className="text-sm leading-none font-medium">{feature.title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-4">
            {feature.description}
          </p>
        </div>
      </Link>
    </li>
  );
}

type Props = {
  user: {
    name: string;
  };
};

export default function OnboardingContent({ user }: Props) {
  const steps = listOnboardingSteps();
  const {
    currentStep,
    nextStep,
    prevStep,
    isFirstStep,
    totalSteps,
    data,
    isInitialized,
    saveCompanyData,
    saveTeamData,
    setTeamId,
    clearData,
  } = useOnboarding();

  const handleCompanySubmit = (data: z.infer<typeof companySchema>) => {
    console.log("Company data:", data);
    saveCompanyData(data);
    nextStep();
  };

  const handleTeamSubmit = (data: z.infer<typeof teamSchema>) => {
    console.log("Team data:", data);
    saveTeamData(data);
    // Generate a simple team ID (in a real app, this would come from the backend)
    const teamId = TeamId.nextId().value;
    setTeamId(teamId);
    nextStep();
  };

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <main className="grid place-items-center h-screen bg-neutral-50 p-3">
        <section className="flex flex-col items-center justify-center w-full md:w-[460px] p-1.5 rounded-2xl bg-neutral-100 border">
          <div className="w-full bg-background p-3 rounded-lg border border-neutral-200 space-y-4 h-full">
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="grid place-items-center h-screen bg-neutral-50 p-3">
      <section className="flex flex-col items-center justify-center w-full md:w-[460px] p-1.5 rounded-2xl bg-neutral-100 border">
        <div className="w-full bg-background p-3 rounded-lg border border-neutral-200 space-y-4 h-full">
          <section className="text-center">
            <div className="flex items-center justify-between">
              <Button
                size="icon"
                className="rounded-full"
                onClick={prevStep}
                disabled={isFirstStep}
              >
                <Icon icon="ph:caret-left-bold" height={12} />
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/klip-icon.svg"
                  alt="Klip Logo"
                  width={22}
                  height={22}
                />
                <span className="text-sm font-semibold leading-0">
                  Klip Inc.
                </span>
              </Link>
              <Button 
                size="icon" 
                className="rounded-full"
                onClick={() => {
                  clearData();
                  window.location.href = "/";
                }}
              >
                <Icon icon="ph:x-bold" height={12} />
              </Button>
            </div>
          </section>
          <section className="flex justify-center space-x-1">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={clsx(
                  "w-full h-1 rounded-full",
                  index + 1 === currentStep && "bg-primary",
                  index + 1 < currentStep && "bg-primary/50",
                  index + 1 > currentStep && "bg-neutral-300"
                )}
              />
            ))}
          </section>

          <section className="mb-3">
            <h2 className="text-xl font-semibold">
              {steps[currentStep - 1]?.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {steps[currentStep - 1]?.description}
            </p>
          </section>

          <section className="space-y-4">
            {currentStep === 1 && (
              <CompanyForm
                onNext={handleCompanySubmit}
                defaultValues={data.company}
              />
            )}

            {currentStep === 2 && (
              <TeamForm onNext={handleTeamSubmit} defaultValues={data.team} />
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Icon
                    icon="ph:check-bold"
                    height={32}
                    className="text-green-600"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    ¡Configuración completada!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tu cuenta ha sido configurada exitosamente. Ya puedes
                    empezar a usar Klip.
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {ONBOARDING_FEATURES.map((feature) => (
                    <FeatureItem
                      key={feature.id}
                      feature={feature}
                      teamId={data.teamId || ""}
                    />
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant="secondary" 
                  onClick={() => {
                    clearData();
                    window.location.href = `/admin/${data.teamId}/dashboard`;
                  }}
                >
                  Ir al dashboard
                </Button>
              </div>
            )}
          </section>
        </div>
        <div className="flex justify-between items-center w-full px-1.5">
          <Button variant="link" className="text-sm px-1">
            {user.name}
          </Button>
          <Button variant="link" className="text-sm px-1" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </section>
    </main>
  );
}
