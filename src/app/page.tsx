"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { Step1GeneralInfo } from "@/components/wizard/steps/Step1GeneralInfo";
import { Step2Tasks } from "@/components/wizard/steps/Step2Tasks";
import { Step3Incidents } from "@/components/wizard/steps/Step3Incidents";
import { Step4Metrics } from "@/components/wizard/steps/Step4Metrics";
import { useWizardStore } from "@/store/wizard";

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { step, reset } = useWizardStore();

  const handleClose = () => {
    reset();
    setShowWizard(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Placeholder — AI generation will be wired in Week 3
    await new Promise((r) => setTimeout(r, 1500));
    setIsGenerating(false);
    alert("Generación AI — próximamente (Semana 3)");
  };

  if (showWizard) {
    return (
      <WizardLayout step={step} onClose={handleClose}>
        {step === 1 && <Step1GeneralInfo />}
        {step === 2 && <Step2Tasks />}
        {step === 3 && <Step3Incidents />}
        {step === 4 && (
          <Step4Metrics onGenerate={handleGenerate} isGenerating={isGenerating} />
        )}
      </WizardLayout>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-3">
        <h1 className="font-mono text-5xl font-bold tracking-tight">
          Shift<span className="text-primary">Report</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
          Generador inteligente de reportes de turno industrial con asistencia de AI
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          size="lg"
          className="font-mono"
          onClick={() => setShowWizard(true)}
        >
          + Nuevo Reporte
        </Button>
        <Button variant="outline" size="lg" className="font-mono">
          Ver Historial
        </Button>
      </div>

      <p className="text-xs text-muted-foreground font-mono opacity-50">
        Next.js 16 · TypeScript · Tailwind v4 · shadcn/ui · Zustand · Claude API
      </p>
    </main>
  );
}
