import { Button } from "@/components/ui/button";

export default function Home() {
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
        <Button size="lg" className="font-mono">
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
