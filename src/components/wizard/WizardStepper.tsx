"use client";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

const STEPS = [
  { number: 1, label: "General" },
  { number: 2, label: "Tareas" },
  { number: 3, label: "Incidentes" },
  { number: 4, label: "Métricas" },
] as const;

interface WizardStepperProps {
  currentStep: 1 | 2 | 3 | 4;
}

export function WizardStepper({ currentStep }: WizardStepperProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, idx) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-mono font-semibold transition-all duration-200",
                  isCompleted &&
                    "border-primary bg-primary text-primary-foreground",
                  isActive &&
                    "border-primary bg-transparent text-primary ring-2 ring-primary/20",
                  !isCompleted &&
                    !isActive &&
                    "border-border bg-muted/30 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckIcon className="h-3.5 w-3.5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-mono whitespace-nowrap",
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  "mb-5 h-px w-12 transition-colors duration-300",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
