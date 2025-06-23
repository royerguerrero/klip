"use client";

import { Button } from "@/app/_components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import {
  OnboardingProvider,
  useOnboarding,
} from "./_contexts/onboarding-context";
import { listOnboardingSteps } from "./_lib/data";
import clsx from "clsx";
import { z } from "zod";
import CompanyForm from "./_components/forms/company";
import TeamForm from "./_components/forms/team";
import { companySchema, teamSchema } from "./_components/forms/schemas";

function OnboardingContent() {
  const steps = listOnboardingSteps();
  const {
    currentStep,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    totalSteps,
    data,
    saveCompanyData,
    saveTeamData,
    setTeamId,
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
    const teamId = `team_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    setTeamId(teamId);
    nextStep();
  };

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
                <Icon icon="ph:arrow-left-bold" className="size-3" />
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
              <Button size="icon" className="rounded-full">
                <Link href="/">
                  <Icon icon="ph:x-bold" className="size-3" />
                </Link>
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
                    className="size-8 text-green-600"
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
                <Button className="w-full" variant="primary" asChild>
                  <Link href={`/admin/${data.teamId}/dashboard`}>
                    Ir al dashboard
                  </Link>
                </Button>
              </div>
            )}
          </section>
        </div>
        <div className="flex justify-between items-center w-full px-1.5">
          <Button variant="link" className="text-sm px-1">
            Royer Guerrero
          </Button>
          <Button variant="link" className="text-sm px-1">
            Cerrar sesión
          </Button>
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}
