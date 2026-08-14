"use client";

import { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useTransactions } from "./useTransactions";
import { TransactionType } from "@/types/transaction";
import useDebounce from "@/utils/useDebounce";

const PAGE_DEFAULT = 1;
const LIMIT_DEFAULT = 10;
const DELAY = 500;

const useTransaction = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounce = useDebounce();

  const currentPage = Number(searchParams.get("page") ?? PAGE_DEFAULT);

  const currentLimit = Number(searchParams.get("limit") ?? LIMIT_DEFAULT);

  const currentSearch = searchParams.get("search") ?? "";
  const currentCategoryId = searchParams.get("categoryId") ?? "";

  const typeParam = searchParams.get("type");

  const currentType =
    typeParam === TransactionType.INCOME ||
    typeParam === TransactionType.EXPENSE
      ? typeParam
      : undefined;

  const updateURL = (params: Record<string, string | number | undefined>) => {
    const current = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    });

    router.replace(`${pathname}?${current.toString()}`, {
      scroll: false,
    });
  };

  const { data, isLoading, isFetching, refetch } = useTransactions({
    page: currentPage,
    limit: currentLimit,
    search: currentSearch,
    categoryId: currentCategoryId || undefined,
    type: currentType,
  });

  const handleChangePage = (page: number) => {
    updateURL({
      page,
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    updateURL({
      limit: Number(e.target.value),
      page: PAGE_DEFAULT,
    });
  };

  const debounceSearch = debounce((search: string) => {
    updateURL({
      search,
      page: PAGE_DEFAULT,
    });
  }, DELAY);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  const handleClearSearch = () => {
    updateURL({
      search: "",
      page: PAGE_DEFAULT,
    });
  };

  const handleChangeType = (type?: TransactionType) => {
    updateURL({
      type,
      page: PAGE_DEFAULT,
    });
  };

  const handleChangeCategory = (categoryId?: string) => {
    updateURL({
      categoryId,
      page: PAGE_DEFAULT,
    });
  };

  return {
    data,
    isLoading,
    isFetching,
    refetch,

    currentPage,
    currentLimit,
    currentSearch,
    currentType,
    currentCategoryId,

    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleChangeType,
    handleChangeCategory,
  };
};

export default useTransaction;
