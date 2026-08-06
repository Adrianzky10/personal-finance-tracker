import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between px-2 pt-2">
        <Skeleton className="h-4 w-62.5" />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-17.5" />
            <Skeleton className="h-8 w-8" />
          </div>
          <div className="flex w-25 items-center justify-center text-sm font-medium">
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="hidden h-8 w-8 lg:flex" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="hidden h-8 w-8 lg:flex" />
          </div>
        </div>
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
