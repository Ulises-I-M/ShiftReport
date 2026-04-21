export type ShiftType = "mañana" | "tarde" | "noche" | "guardia";
export type TaskStatus = "completada" | "en_progreso" | "pendiente" | "cancelada";
export type TaskType = "mantenimiento" | "operacion" | "inspeccion" | "limpieza" | "calibracion" | "otro";
export type IncidentSeverity = "bajo" | "medio" | "alto" | "critico";

export interface GeneralInfo {
  date: string;
  shift: ShiftType;
  area: string;
  supervisor: string;
  operator: string;
}

export interface Task {
  id: string;
  type: TaskType;
  description: string;
  status: TaskStatus;
  duration?: number; // minutos
  equipment?: string;
}

export interface Incident {
  id: string;
  severity: IncidentSeverity;
  description: string;
  action: string;
  resolved: boolean;
  time?: string;
}

export interface Metric {
  id: string;
  name: string;
  value: number | string;
  unit?: string;
  target?: number | string;
}

export interface ReportFormData {
  generalInfo: GeneralInfo;
  tasks: Task[];
  incidents: Incident[];
  metrics: Metric[];
}

export interface GeneratedReport {
  id: string;
  createdAt: string;
  formData: ReportFormData;
  executiveSummary: string;
  anomaliesDetected: string[];
  actionItems: string[];
  rawContent: string;
}
