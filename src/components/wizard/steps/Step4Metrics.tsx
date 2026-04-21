"use client";

import { useState } from "react";
import { useWizardStore } from "@/store/wizard";
import { WizardNavigation } from "../WizardNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, Trash2Icon } from "lucide-react";

interface Step4MetricsProps {
  onGenerate: () => void;
  isGenerating?: boolean;
}

export function Step4Metrics({ onGenerate, isGenerating = false }: Step4MetricsProps) {
  const { formData, addMetric, updateMetric, removeMetric, setStep } =
    useWizardStore();
  const [error, setError] = useState("");

  // First 6 are predefined (not removable), rest are custom
  const predefinedMetrics = formData.metrics.slice(0, 6);
  const customMetrics = formData.metrics.slice(6);

  const handleNext = () => {
    const unnamed = customMetrics.find((m) => !m.name.trim());
    if (unnamed) {
      setError("Completá el nombre de todas las métricas personalizadas.");
      return;
    }
    setError("");
    onGenerate();
  };

  return (
    <div className="mt-6">
      {/* Predefined metrics */}
      <div className="space-y-3">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
          Métricas estándar
        </p>
        <div className="grid gap-2">
          {predefinedMetrics.map((metric) => (
            <div
              key={metric.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
            >
              <span className="font-mono text-xs text-muted-foreground w-40 shrink-0">
                {metric.name}
              </span>
              <Input
                type="number"
                placeholder="—"
                value={String(metric.value)}
                onChange={(e) =>
                  updateMetric(metric.id, { value: e.target.value })
                }
                className="w-28 font-mono text-sm text-right"
              />
              <span className="font-mono text-xs text-muted-foreground w-20">
                {metric.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom metrics */}
      {customMetrics.length > 0 && (
        <div className="mt-5 space-y-3">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
            Métricas personalizadas
          </p>
          {customMetrics.map((metric) => (
            <div
              key={metric.id}
              className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 animate-in fade-in-0 slide-in-from-top-2 duration-200"
            >
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label className="font-mono text-xs">Nombre</Label>
                  <Input
                    placeholder="ej: Presión"
                    value={metric.name}
                    onChange={(e) =>
                      updateMetric(metric.id, { name: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-mono text-xs">Valor</Label>
                  <Input
                    placeholder="—"
                    value={String(metric.value)}
                    onChange={(e) =>
                      updateMetric(metric.id, { value: e.target.value })
                    }
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-mono text-xs">Unidad</Label>
                  <Input
                    placeholder="ej: bar"
                    value={metric.unit ?? ""}
                    onChange={(e) =>
                      updateMetric(metric.id, { unit: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeMetric(metric.id)}
                className="mt-6 cursor-pointer text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={addMetric}
        className="mt-4 w-full font-mono gap-2 border-dashed"
      >
        <PlusIcon className="h-4 w-4" />
        Agregar Métrica Personalizada
      </Button>

      {error && (
        <p className="mt-2 text-xs text-destructive font-mono">{error}</p>
      )}

      <WizardNavigation
        step={4}
        onBack={() => setStep(3)}
        onNext={handleNext}
        isLoading={isGenerating}
      />
    </div>
  );
}
