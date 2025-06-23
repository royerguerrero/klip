"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { z } from "zod";
import { companySchema, teamSchema } from "../_components/forms/schemas";

type CompanyData = z.infer<typeof companySchema>;
type TeamData = z.infer<typeof teamSchema>;

interface OnboardingData {
  company?: CompanyData;
  team?: TeamData;
  teamId?: string;
}

interface OnboardingContextType {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  totalSteps: number;
  data: OnboardingData;
  saveCompanyData: (data: CompanyData) => void;
  saveTeamData: (data: TeamData) => void;
  setTeamId: (id: string) => void;
  clearData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({});
  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const saveCompanyData = (companyData: CompanyData) => {
    setData(prev => ({ ...prev, company: companyData }));
  };

  const saveTeamData = (teamData: TeamData) => {
    setData(prev => ({ ...prev, team: teamData }));
  };

  const setTeamId = (id: string) => {
    setData(prev => ({ ...prev, teamId: id }));
  };

  const clearData = () => {
    setData({});
    setCurrentStep(1);
  };

  const value: OnboardingContextType = {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    totalSteps,
    data,
    saveCompanyData,
    saveTeamData,
    setTeamId,
    clearData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
} 