"use client";

import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { useState } from "react";
import QuestionFormComponent from "./forms/question";

type InputType =
  | "name"
  | "short text"
  | "long text"
  | "date"
  | "select"
  | "email"
  | "phone";

interface Question {
  id: string;
  label: string;
  inputType: InputType;
  required: boolean;
  options?: string[];
  order: number;
}

interface OnboardingSectionProps {
  questions: Question[];
}



export function OnboardingSection({ questions }: OnboardingSectionProps) {
  const [questionsState, setQuestionsState] = useState(questions);

  const handleQuestionUpdate = (updatedQuestion: Question) => {
    setQuestionsState((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  return (
    <article className="space-y-3">
      <h2 className="font-semibold text-secondary-foreground leading-none">
        Onboarding
      </h2>
      {questionsState
        .sort((a, b) => a.order - b.order)
        .map((question) => (
          <article key={question.id} className="flex items-center gap-3">
            <div className="w-full bg-neutral-100 rounded-lg p-2 pl-3 text-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-medium leading-none">{question.label}</h4>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">
                    {question.required ? "Requerido" : "Opcional"}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="px-1.5 py-0.5 h-fit"
                        size="sm"
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar pregunta</DialogTitle>
                      </DialogHeader>
                                            <QuestionFormComponent 
                        initialData={{
                          label: question.label,
                          inputType: question.inputType,
                          required: question.required,
                          options: question.options
                        }}
                        onSave={(data) => {
                          handleQuestionUpdate({
                            ...question,
                            ...data
                          });
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <p className="text-muted-foreground">
                {question.inputType === "select" && question.options
                  ? `${question.inputType} (${question.options.length} opciones)`
                  : question.inputType}
              </p>
            </div>
            <Icon icon="ph:dots-six-vertical" height={20} />
          </article>
        ))}
      <div className="flex flex-col gap-3 items-end">
        <Button variant="outline" className="w-fit px-1">
          <Icon icon="ph:plus" height={12} />
          Agregar pregunta
        </Button>
      </div>
    </article>
  );
}
