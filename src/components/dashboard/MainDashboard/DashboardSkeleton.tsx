import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Welcome Bar Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-62.5 sm:w-75" />
          <Skeleton className="h-4 w-75 sm:w-100" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-35" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* Transaction Summary Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-35 w-full rounded-xl" />
        ))}
      </div>

      {/* Transaction Chart Skeleton */}
      <Skeleton className="h-87.5 w-full rounded-xl" />

      {/* Transaction Table Skeleton */}
      <div className="space-y-4">
        {/* Table Body */}
        <Skeleton className="h-100 w-full rounded-xl" />

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-8 w-25" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
