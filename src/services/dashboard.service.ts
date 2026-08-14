import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import {
  GetDashboardInput,
  GetDashboardSchema,
} from "@/validations/dashboard.validation";

export async function getDashboard(query: GetDashboardInput) {
  await connectDB();

  const user = await requireAuth();

  const { months } = GetDashboardSchema.parse(query);

  const now = new Date();

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth() - (months - 1),
    1,
  );

  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  const summary = await Transaction.aggregate([
    {
      $match: {
        userId: user._id,
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  for (const item of summary) {
    if (item._id === "income") {
      totalIncome = item.total;
    }

    if (item._id === "expense") {
      totalExpense = item.total;
    }
  }

  const balance = totalIncome - totalExpense;

  const chartData = await Transaction.aggregate([
    {
      $match: {
        userId: user._id,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const chart = [];

  for (let i = 0; i < months; i++) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - (months - 1 - i),
      1,
    );

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const income = chartData.find(
      (item) =>
        item._id.year === year &&
        item._id.month === month &&
        item._id.type === "income",
    );

    const expense = chartData.find(
      (item) =>
        item._id.year === year &&
        item._id.month === month &&
        item._id.type === "expense",
    );

    chart.push({
      month: date.toLocaleString("en-US", {
        month: "short",
      }),
      income: income?.total ?? 0,
      expense: expense?.total ?? 0,
    });
  }

  return {
    summary: {
      totalIncome,
      totalExpense,
      balance,
    },
    chart,
  };
}
