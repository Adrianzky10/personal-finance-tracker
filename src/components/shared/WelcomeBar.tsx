import { Plus, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PropTypes {
  type: string;
  title: string;
  description: string;
  onCreateCategory?: () => void;
}

const WelcomeBar = (props: PropTypes) => {
  const { type, title, description, onCreateCategory } = props;
  return (
    <section className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-6 shadow-sm md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex gap-3">
        {type === "categories" && (
          <Button className="rounded-xl" onClick={onCreateCategory}>
            <Plus className="h-4 w-4" />
            Category
          </Button>
        )}
        {type === "dashboard" && (
          <>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={onCreateCategory}
            >
              <Plus className="h-4 w-4" />
              Category
            </Button>

            <Button className="rounded-xl">
              <ReceiptText className="h-4 w-4" />
              New Transaction
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default WelcomeBar;
