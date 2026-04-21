"use client";

import { useState } from "react";
import { useWizardStore } from "@/store/wizard";
import { WizardNavigation } from "../WizardNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TaskStatus, TaskType } from "@/types/report";

const TASK_TYPE_LABELS: Record<TaskType, string> = {
  mantenimiento: "Mantenimiento",
  operacion: "Operación",
  inspeccion: "Inspección",
  limpieza: "Limpieza",
  calibracion: "Calibración",
  otro: "Otro",
};

const STATUS_CONFIG: Record<TaskStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  completada: { label: "Completada", variant: "default" },
  en_progreso: { label: "En progreso", variant: "secondary" },
  pendiente: { label: "Pendiente", variant: "outline" },
  cancelada: { label: "Cancelada", variant: "destructive" },
};

export function Step2Tasks() {
  const { formData, addTask, updateTask, removeTask, setStep } = useWizardStore();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (formData.tasks.length === 0) {
      setError("Agregá al menos una tarea antes de continuar.");
      return;
    }
    const incomplete = formData.tasks.find((t) => !t.description.trim());
    if (incomplete) {
      setError("Completá la descripción de todas las tareas.");
      return;
    }
    setError("");
    setStep(3);
  };

  return (
    <div className="mt-6">
      <div className="space-y-3">
        {formData.tasks.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-muted/10 py-10 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              No hay tareas registradas.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Usá el botón de abajo para agregar la primera.
            </p>
          </div>
        )}

        {formData.tasks.map((task, idx) => (
          <div
            key={task.id}
            className="rounded-lg border border-border bg-card p-4 space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                Tarea #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeTask(task.id)}
                className="cursor-pointer text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            </div>

            {/* Tipo y Estado */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="font-mono text-xs">Tipo</Label>
                <Select
                  value={task.type}
                  onValueChange={(v) => updateTask(task.id, { type: v as TaskType })}
                >
                  <SelectTrigger className="w-full font-mono text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TASK_TYPE_LABELS).map(([v, label]) => (
                      <SelectItem key={v} value={v} className="font-mono text-xs">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="font-mono text-xs">Estado</Label>
                <Select
                  value={task.status}
                  onValueChange={(v) => updateTask(task.id, { status: v as TaskStatus })}
                >
                  <SelectTrigger className="w-full font-mono text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_CONFIG).map(([v, cfg]) => (
                      <SelectItem key={v} value={v} className="font-mono text-xs">
                        {cfg.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-1">
              <Label className="font-mono text-xs">
                Descripción <span className="text-destructive">*</span>
              </Label>
              <Textarea
                placeholder="Describí la tarea realizada..."
                value={task.description}
                onChange={(e) => updateTask(task.id, { description: e.target.value })}
                className="min-h-[72px] resize-none text-sm"
              />
            </div>

            {/* Equipo */}
            <div className="space-y-1">
              <Label className="font-mono text-xs">Equipo / Máquina (opcional)</Label>
              <Input
                placeholder="ej: Compresor C-04"
                value={task.equipment ?? ""}
                onChange={(e) => updateTask(task.id, { equipment: e.target.value })}
                className="text-sm"
              />
            </div>

            {/* Status badge */}
            <Badge variant={STATUS_CONFIG[task.status].variant} className="font-mono">
              {STATUS_CONFIG[task.status].label}
            </Badge>
          </div>
        ))}
      </div>

      {/* Add task button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => { addTask(); setError(""); }}
        className={cn("mt-4 w-full font-mono gap-2 border-dashed")}
      >
        <PlusIcon className="h-4 w-4" />
        Agregar Tarea
      </Button>

      {error && (
        <p className="mt-2 text-xs text-destructive font-mono">{error}</p>
      )}

      <WizardNavigation
        step={2}
        onBack={() => setStep(1)}
        onNext={handleNext}
      />
    </div>
  );
}
