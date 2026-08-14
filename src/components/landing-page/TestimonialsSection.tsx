import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      content:
        "This tracker completely changed how I look at my monthly spending. The elegant interface makes it a joy to use every day, and I've saved more in 3 months than I did all last year.",
      author: "Sarah Jenkins",
      role: "Freelance Designer",
      initials: "SJ",
    },
    {
      content:
        "Finally, a finance app that doesn't feel like a clunky spreadsheet. The analytics are clear, and I love the dark mode. Setting it up was incredibly fast and seamless.",
      author: "David Chen",
      role: "Software Engineer",
      initials: "DC",
    },
    {
      content:
        "As a small business owner, keeping track of expenses used to be my biggest headache. This tool simplifies everything with custom categories and real-time summaries.",
      author: "Elena Rodriguez",
      role: "Café Owner",
      initials: "ER",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by thousands of users.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            See how Personal Finance Tracker is helping people around the world
            take control of their financial lives.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-3xl border bg-background p-8 shadow-sm"
            >
              <div>
                <Quote className="h-8 w-8 text-primary/40 mb-6" />
                <p className="text-lg leading-relaxed text-foreground">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-4 border-t pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
