import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowDownLeft, ArrowUpRight, Scale } from "lucide-react";

interface TransactionSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function TransactionSummary({
  totalIncome,
  totalExpense,
  balance,
}: TransactionSummaryProps) {
  const cards = [
    {
      title: "Total Income",
      value: totalIncome,
      description: "Verified inflows",
      icon: ArrowDownLeft,
      iconClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      descriptionClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Total Expense",
      value: totalExpense,
      description: "Outflows logged",
      icon: ArrowUpRight,
      iconClass:
        "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
      descriptionClass: "text-rose-600 dark:text-rose-400",
    },
    {
      title: "Net Balance",
      value: balance,
      description: "Total Income − Total Expense",
      icon: Scale,
      iconClass: "bg-primary/10 text-primary",
      descriptionClass: "text-muted-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title} className="rounded-3xl transition-colors">
            <CardContent className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {card.title}
                </span>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="text-3xl font-bold tabular-nums tracking-tight">
                {formatCurrency(card.value)}
              </div>

              <div
                className={`mt-3 flex items-center gap-1 text-xs font-medium ${card.descriptionClass}`}
              >
                {card.description}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
