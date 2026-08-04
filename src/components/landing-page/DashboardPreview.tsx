import Image from "next/image";

export default function DashboardPreview() {
  return (
    <section className="relative mx-auto mt-20 w-full max-w-7xl px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5">
        {/* Browser Header */}
        <div className="flex items-center gap-2 border-b border-border bg-muted px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-destructive" />
          <span className="h-3 w-3 rounded-full bg-warning" />
          <span className="h-3 w-3 rounded-full bg-success" />

          <div className="mx-auto rounded-md bg-background px-4 py-1 text-xs text-muted-foreground">
            app.fintracker.com
          </div>
        </div>

        {/* Screenshot */}
        <div className="relative">
          <Image
            src="/images/dashboard-preview.png"
            alt="FinTracker Dashboard"
            width={1600}
            height={900}
            priority
            className="w-full"
          />

          {/* Fade Bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background via-background/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
