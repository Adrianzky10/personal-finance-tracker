import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

interface PropTypes {
  category: Category;
}

const CategoryItem = (props: PropTypes) => {
  const { category } = props;
  return (
    <div className="group flex items-center justify-between rounded-2xl border bg-background p-4 transition-all hover:shadow-sm">
      <span className="font-medium">{category.name}</span>

      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost" className="cursor-pointer">
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="cursor-pointer text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CategoryItem;
