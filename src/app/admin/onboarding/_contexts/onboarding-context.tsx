"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
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
  isInitialized: boolean;
  saveCompanyData: (data: CompanyData) => void;
  saveTeamData: (data: TeamData) => void;
  setTeamId: (id: string) => void;
  clearData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = "klip-onboarding-progress";

// Helper functions for localStorage
const saveToStorage = (data: { currentStep: number; data: OnboardingData }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

const loadFromStorage = (): { currentStep: number; data: OnboardingData } | null => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing stored onboarding data:", error);
        return null;
      }
    }
  }
  return null;
};

const clearStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const totalSteps = 3;

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setCurrentStep(stored.currentStep);
      setData(stored.data);
    }
    setIsInitialized(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      saveToStorage({ currentStep, data });
    }
  }, [currentStep, data, isInitialized]);

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
    clearStorage();
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
    isInitialized,
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