import { ShieldCheck, CloudLightning, LineChart, Laptop } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: ShieldCheck,
      title: "Bank-Grade Security",
      description:
        "Your financial data is encrypted and protected with industry-standard security measures. Privacy is our top priority.",
    },
    {
      icon: LineChart,
      title: "Insightful Analytics",
      description:
        "Transform raw numbers into beautiful, easy-to-understand charts. Get actionable insights into your spending habits.",
    },
    {
      icon: CloudLightning,
      title: "Real-time Sync",
      description:
        "Your data is securely stored in the cloud and instantly synchronized. Never worry about losing your financial history.",
    },
    {
      icon: Laptop,
      title: "Cross-Platform Access",
      description:
        "Access your dashboard seamlessly from your desktop, tablet, or mobile device. Always stay on top of your finances.",
    },
  ];

  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Services
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            More than just tracking numbers.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We provide a comprehensive suite of services designed to give you
            peace of mind and complete clarity over your financial situation.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col items-start gap-4 rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
