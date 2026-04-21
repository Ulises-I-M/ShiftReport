"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizardStore } from "@/store/wizard";
import { generalInfoSchema, type GeneralInfoFormData } from "@/lib/validations";
import { WizardNavigation } from "../WizardNavigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Step1GeneralInfo() {
  const { formData, updateGeneralInfo, setStep } = useWizardStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GeneralInfoFormData>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: formData.generalInfo,
  });

  const onSubmit = (data: GeneralInfoFormData) => {
    updateGeneralInfo(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mt-6 grid gap-5">
        {/* Fecha y Turno */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="date" className="font-mono text-xs">
              Fecha <span className="text-destructive">*</span>
            </Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              className="font-mono"
            />
            {errors.date && (
              <p className="text-xs text-destructive">{errors.date.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="font-mono text-xs">
              Turno <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="shift"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full font-mono">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mañana">🌅 Mañana</SelectItem>
                    <SelectItem value="tarde">☀️ Tarde</SelectItem>
                    <SelectItem value="noche">🌙 Noche</SelectItem>
                    <SelectItem value="guardia">🔒 Guardia</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.shift && (
              <p className="text-xs text-destructive">{errors.shift.message}</p>
            )}
          </div>
        </div>

        {/* Área */}
        <div className="space-y-1.5">
          <Label htmlFor="area" className="font-mono text-xs">
            Área / Sector <span className="text-destructive">*</span>
          </Label>
          <Input
            id="area"
            placeholder="ej: Línea 3 — Ensamblado"
            {...register("area")}
          />
          {errors.area && (
            <p className="text-xs text-destructive">{errors.area.message}</p>
          )}
        </div>

        {/* Supervisor */}
        <div className="space-y-1.5">
          <Label htmlFor="supervisor" className="font-mono text-xs">
            Supervisor <span className="text-destructive">*</span>
          </Label>
          <Input
            id="supervisor"
            placeholder="Nombre completo"
            {...register("supervisor")}
          />
          {errors.supervisor && (
            <p className="text-xs text-destructive">
              {errors.supervisor.message}
            </p>
          )}
        </div>

        {/* Operador */}
        <div className="space-y-1.5">
          <Label htmlFor="operator" className="font-mono text-xs">
            Operador / Responsable <span className="text-destructive">*</span>
          </Label>
          <Input
            id="operator"
            placeholder="Nombre completo"
            {...register("operator")}
          />
          {errors.operator && (
            <p className="text-xs text-destructive">
              {errors.operator.message}
            </p>
          )}
        </div>
      </div>

      <WizardNavigation
        step={1}
        onBack={() => {}}
        onNext={() => handleSubmit(onSubmit)()}
      />
    </form>
  );
}
