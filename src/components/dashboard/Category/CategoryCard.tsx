import { Badge } from "@/components/ui/badge";
import React from "react";
import CategoryItem from "./CategoryItem";
import { Category } from "@/types/category";

interface PropTypes {
  title: string;
  color: "success" | "danger";
  categories: Category[];
}

const colors = {
  success: {
    dot: "bg-success",
    badge:
      "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  },
  danger: {
    dot: "bg-danger",
    badge: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  },
};

const CategoryCard = (props: PropTypes) => {
  const { color, title, categories } = props;
  return (
    <div className="rounded-3xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${colors[color].dot}`} />
          <h2 className="text-lg font-bold capitalize">{title}</h2>

          <Badge className={colors[color].badge}>
            {categories.length} items
          </Badge>
        </div>
      </div>

      <div className="space-y-3 p-6">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
