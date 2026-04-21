"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { GeneralInfo, Task, Incident, Metric, ReportFormData } from "@/types/report";

const DEFAULT_METRICS: Metric[] = [
  { id: "m1", name: "Producción", value: "", unit: "unidades/hs" },
  { id: "m2", name: "Downtime", value: "", unit: "minutos" },
  { id: "m3", name: "OEE", value: "", unit: "%" },
  { id: "m4", name: "Temperatura máxima", value: "", unit: "°C" },
  { id: "m5", name: "Alertas generadas", value: "", unit: "" },
  { id: "m6", name: "Incidentes de seguridad", value: "", unit: "" },
];

const initialFormData = (): ReportFormData => ({
  generalInfo: {
    date: new Date().toISOString().split("T")[0],
    shift: "mañana",
    area: "",
    supervisor: "",
    operator: "",
  },
  tasks: [],
  incidents: [],
  metrics: DEFAULT_METRICS.map((m) => ({ ...m })),
});

interface WizardStore {
  step: 1 | 2 | 3 | 4;
  formData: ReportFormData;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  updateGeneralInfo: (data: GeneralInfo) => void;
  addTask: () => void;
  updateTask: (id: string, data: Partial<Omit<Task, "id">>) => void;
  removeTask: (id: string) => void;
  addIncident: () => void;
  updateIncident: (id: string, data: Partial<Omit<Incident, "id">>) => void;
  removeIncident: (id: string) => void;
  addMetric: () => void;
  updateMetric: (id: string, data: Partial<Omit<Metric, "id">>) => void;
  removeMetric: (id: string) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardStore>()(
  immer((set) => ({
    step: 1,
    formData: initialFormData(),

    setStep: (step) =>
      set((state) => {
        state.step = step;
      }),

    updateGeneralInfo: (data) =>
      set((state) => {
        state.formData.generalInfo = data;
      }),

    addTask: () =>
      set((state) => {
        state.formData.tasks.push({
          id: crypto.randomUUID(),
          type: "operacion",
          description: "",
          status: "pendiente",
          equipment: "",
        });
      }),

    updateTask: (id, data) =>
      set((state) => {
        const idx = state.formData.tasks.findIndex((t) => t.id === id);
        if (idx !== -1) Object.assign(state.formData.tasks[idx], data);
      }),

    removeTask: (id) =>
      set((state) => {
        state.formData.tasks = state.formData.tasks.filter((t) => t.id !== id);
      }),

    addIncident: () =>
      set((state) => {
        state.formData.incidents.push({
          id: crypto.randomUUID(),
          severity: "bajo",
          description: "",
          action: "",
          resolved: false,
          time: "",
        });
      }),

    updateIncident: (id, data) =>
      set((state) => {
        const idx = state.formData.incidents.findIndex((i) => i.id === id);
        if (idx !== -1) Object.assign(state.formData.incidents[idx], data);
      }),

    removeIncident: (id) =>
      set((state) => {
        state.formData.incidents = state.formData.incidents.filter(
          (i) => i.id !== id
        );
      }),

    addMetric: () =>
      set((state) => {
        state.formData.metrics.push({
          id: crypto.randomUUID(),
          name: "",
          value: "",
          unit: "",
        });
      }),

    updateMetric: (id, data) =>
      set((state) => {
        const idx = state.formData.metrics.findIndex((m) => m.id === id);
        if (idx !== -1) Object.assign(state.formData.metrics[idx], data);
      }),

    removeMetric: (id) =>
      set((state) => {
        state.formData.metrics = state.formData.metrics.filter(
          (m) => m.id !== id
        );
      }),

    reset: () =>
      set((state) => {
        state.step = 1;
        state.formData = initialFormData();
      }),
  }))
);
