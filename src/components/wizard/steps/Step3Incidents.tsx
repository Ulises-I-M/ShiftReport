"use client";

import { useState } from "react";
import { useWizardStore } from "@/store/wizard";
import { WizardNavigation } from "../WizardNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, Trash2Icon, ShieldAlertIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IncidentSeverity } from "@/types/report";

const SEVERITY_CONFIG: Record<
  IncidentSeverity,
  { label: string; className: string }
> = {
  bajo: { label: "Bajo", className: "bg-green-500/15 text-green-400 border-green-500/30" },
  medio: { label: "Medio", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  alto: { label: "Alto", className: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  critico: { label: "Crítico", className: "bg-destructive/15 text-destructive border-destructive/30" },
};

export function Step3Incidents() {
  const { formData, addIncident, updateIncident, removeIncident, setStep } =
    useWizardStore();
  const [error, setError] = useState("");

  const handleNext = () => {
    const incomplete = formData.incidents.find(
      (i) => !i.description.trim() || !i.action.trim()
    );
    if (incomplete) {
      setError("Completá la descripción y acción de todos los incidentes.");
      return;
    }
    setError("");
    setStep(4);
  };

  return (
    <div className="mt-6">
      {formData.incidents.length === 0 && (
        <div className="rounded-lg border border-dashed border-border bg-muted/10 py-10 text-center">
          <ShieldAlertIcon className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
          <p className="font-mono text-sm text-muted-foreground">
            Sin incidentes registrados.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Si no hubo incidentes, podés continuar al siguiente paso.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {formData.incidents.map((incident, idx) => (
          <div
            key={incident.id}
            className="rounded-lg border border-border bg-card p-4 space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  Incidente #{idx + 1}
                </span>
                <Badge
                  className={cn(
                    "font-mono text-xs border",
                    SEVERITY_CONFIG[incident.severity].className
                  )}
                >
                  {SEVERITY_CONFIG[incident.severity].label}
                </Badge>
              </div>
              <button
                type="button"
                onClick={() => removeIncident(incident.id)}
                className="cursor-pointer text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            </div>

            {/* Severidad y Hora */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="font-mono text-xs">Severidad</Label>
                <Select
                  value={incident.severity}
                  onValueChange={(v) =>
                    updateIncident(incident.id, { severity: v as IncidentSeverity })
                  }
                >
                  <SelectTrigger className="w-full font-mono text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SEVERITY_CONFIG).map(([v, cfg]) => (
                      <SelectItem key={v} value={v} className="font-mono text-xs">
                        {cfg.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="font-mono text-xs">Hora (opcional)</Label>
                <Input
                  type="time"
                  value={incident.time ?? ""}
                  onChange={(e) =>
                    updateIncident(incident.id, { time: e.target.value })
                  }
                  className="font-mono text-sm"
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-1">
              <Label className="font-mono text-xs">
                Descripción del incidente <span className="text-destructive">*</span>
              </Label>
              <Textarea
                placeholder="¿Qué ocurrió?"
                value={incident.description}
                onChange={(e) =>
                  updateIncident(incident.id, { description: e.target.value })
                }
                className="min-h-[64px] resize-none text-sm"
              />
            </div>

            {/* Acción tomada */}
            <div className="space-y-1">
              <Label className="font-mono text-xs">
                Acción tomada <span className="text-destructive">*</span>
              </Label>
              <Textarea
                placeholder="¿Cómo se resolvió o mitigó?"
                value={incident.action}
                onChange={(e) =>
                  updateIncident(incident.id, { action: e.target.value })
                }
                className="min-h-[64px] resize-none text-sm"
              />
            </div>

            {/* Resuelto */}
            <div className="flex items-center gap-2">
              <Checkbox
                id={`resolved-${incident.id}`}
                checked={incident.resolved}
                onCheckedChange={(checked) =>
                  updateIncident(incident.id, { resolved: Boolean(checked) })
                }
              />
              <Label
                htmlFor={`resolved-${incident.id}`}
                className="font-mono text-xs cursor-pointer"
              >
                Incidente resuelto
              </Label>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => { addIncident(); setError(""); }}
        className="mt-4 w-full font-mono gap-2 border-dashed"
      >
        <PlusIcon className="h-4 w-4" />
        Agregar Incidente
      </Button>

      {error && (
        <p className="mt-2 text-xs text-destructive font-mono">{error}</p>
      )}

      <WizardNavigation step={3} onBack={() => setStep(2)} onNext={handleNext} />
    </div>
  );
}
