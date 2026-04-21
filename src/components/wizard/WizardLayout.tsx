"use client";

import { WizardStepper } from "./WizardStepper";

const STEP_TITLES: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: "Información General",
    subtitle: "Datos básicos del turno",
  },
  2: {
    title: "Tareas Realizadas",
    subtitle: "Registrá las tareas ejecutadas durante el turno",
  },
  3: {
    title: "Incidentes y Anomalías",
    subtitle: "Reportá cualquier incidente o anomalía detectada",
  },
  4: {
    title: "Métricas del Turno",
    subtitle: "Ingresá los indicadores clave del período",
  },
};

interface WizardLayoutProps {
  step: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  onClose: () => void;
}

export function WizardLayout({ step, children, onClose }: WizardLayoutProps) {
  const { title, subtitle } = STEP_TITLES[step];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="font-mono text-sm font-semibold text-foreground">
            Shift<span className="text-primary">Report</span>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕ Cancelar
          </button>
        </div>
      </header>

      {/* Stepper */}
      <div className="border-b border-border bg-card/30 px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <WizardStepper currentStep={step} />
        </div>
      </div>

      {/* Step title */}
      <div className="px-6 pt-6 pb-2">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-mono text-xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-6 pb-8">
        <div className="mx-auto max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
