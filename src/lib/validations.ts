import { z } from "zod";

export const generalInfoSchema = z.object({
  date: z.string().min(1, "La fecha es requerida"),
  shift: z.enum(["mañana", "tarde", "noche", "guardia"] as const, {
    error: "Seleccioná un turno",
  }),
  area: z.string().min(1, "El área es requerida"),
  supervisor: z.string().min(1, "El supervisor es requerido"),
  operator: z.string().min(1, "El operador es requerido"),
});

export const taskSchema = z.object({
  id: z.string(),
  type: z.enum(
    ["mantenimiento", "operacion", "inspeccion", "limpieza", "calibracion", "otro"] as const
  ),
  description: z.string().min(1, "La descripción es requerida"),
  status: z.enum(["completada", "en_progreso", "pendiente", "cancelada"] as const),
  equipment: z.string().optional(),
});

export const incidentSchema = z.object({
  id: z.string(),
  severity: z.enum(["bajo", "medio", "alto", "critico"] as const),
  description: z.string().min(1, "La descripción es requerida"),
  action: z.string().min(1, "La acción tomada es requerida"),
  resolved: z.boolean(),
  time: z.string().optional(),
});

export const metricSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "El nombre es requerido"),
  value: z.string(),
  unit: z.string().optional(),
});

export type GeneralInfoFormData = z.infer<typeof generalInfoSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
export type IncidentFormData = z.infer<typeof incidentSchema>;
export type MetricFormData = z.infer<typeof metricSchema>;
