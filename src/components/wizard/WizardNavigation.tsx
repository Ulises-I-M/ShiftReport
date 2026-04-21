"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from "lucide-react";

interface WizardNavigationProps {
  step: 1 | 2 | 3 | 4;
  onBack: () => void;
  onNext: () => void;
  isLoading?: boolean;
  canAdvance?: boolean;
}

export function WizardNavigation({
  step,
  onBack,
  onNext,
  isLoading = false,
  canAdvance = true,
}: WizardNavigationProps) {
  const isLastStep = step === 4;

  return (
    <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={step === 1}
        className="font-mono gap-1.5"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Anterior
      </Button>

      <span className="font-mono text-xs text-muted-foreground">
        {step} / 4
      </span>

      <Button
        onClick={onNext}
        disabled={!canAdvance || isLoading}
        className="font-mono gap-1.5"
      >
        {isLastStep ? (
          <>
            <SparklesIcon className="h-4 w-4" />
            {isLoading ? "Generando..." : "Generar Reporte"}
          </>
        ) : (
          <>
            Siguiente
            <ChevronRightIcon className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
