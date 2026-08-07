import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
      </div>
    </div>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <div className="rounded-3xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      <div className="space-y-3 p-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-2xl border bg-background p-4"
          >
            <Skeleton className="h-5 w-24" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
