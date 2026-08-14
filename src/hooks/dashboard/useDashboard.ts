"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import dashboardServices from "@/services/api/dashboard.service";
import { queryKeys } from "@/lib/queryKeys";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentMonths = Number(searchParams.get("months") ?? 6);

  const query = useQuery({
    queryKey: queryKeys.dashboard(currentMonths),

    queryFn: async () => {
      const { data } = await dashboardServices.getDashboard(
        String(currentMonths),
      );

      return data;
    },
    placeholderData: keepPreviousData,
  });

  const handleChangeMonths = (months: number) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set("months", String(months));
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  };

  return {
    ...query,
    currentMonths,
    handleChangeMonths,
  };
}
