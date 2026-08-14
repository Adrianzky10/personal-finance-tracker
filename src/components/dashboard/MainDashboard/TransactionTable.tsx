"use client";

import { Pencil, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ITransactionResponseData, TransactionType } from "@/types/transaction";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  isLoading?: boolean;
  transactions: ITransactionResponseData[];
  onEdit: (transaction: ITransactionResponseData) => void;
  onDelete: (transaction: ITransactionResponseData) => void;
  // pagination
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  //search
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  // filter
  currentType?: TransactionType;
  onChangeType: (type?: TransactionType) => void;
}

export default function TransactionTable({
  isLoading,
  transactions,
  onEdit,
  onDelete,
  totalPages,
  currentPage,
  onChangePage,
  onChangeSearch,
  currentType,
  onChangeType,
}: TransactionTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold">Transaction History</h2>

          <p className="text-sm text-muted-foreground">
            Filter and search through your transactions
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row items-center">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search title..."
              className="pl-9 rounded-xl"
              onChange={onChangeSearch}
            />
          </div>

          {/* Filter */}
          <div className="flex rounded-xl bg-muted p-1 justify-center md:justify-start">
            {/* Opsi: All */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="transaction_type"
                className="peer sr-only" // Menyembunyikan bulat radio aslinya
                checked={!currentType}
                onChange={() => onChangeType(undefined)}
              />
              <div className="rounded-lg px-4 py-1.5 text-sm font-medium transition-all text-muted-foreground hover:bg-muted-foreground/20 peer-checked:bg-background peer-checked:text-primary peer-checked:shadow-sm">
                All
              </div>
            </label>

            {/* Opsi: Income */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="transaction_type"
                className="peer sr-only"
                checked={currentType === TransactionType.INCOME}
                onChange={() => onChangeType(TransactionType.INCOME)}
              />
              <div className="rounded-lg px-4 py-1.5 text-sm font-medium transition-all text-muted-foreground hover:bg-muted-foreground/20 peer-checked:bg-background peer-checked:text-primary peer-checked:shadow-sm">
                Income
              </div>
            </label>

            {/* Opsi: Expense */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="transaction_type"
                className="peer sr-only"
                checked={currentType === TransactionType.EXPENSE}
                onChange={() => onChangeType(TransactionType.EXPENSE)}
              />
              <div className="rounded-lg px-4 py-1.5 text-sm font-medium transition-all text-muted-foreground hover:bg-muted-foreground/20 peer-checked:bg-background peer-checked:text-primary peer-checked:shadow-sm">
                Expense
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-3.75" />
                        <Skeleton className="h-3 w-25" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => {
                const isIncome = transaction.type === "income";

                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            isIncome
                              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                          }`}
                        >
                          {isIncome ? <span>↓</span> : <span>↑</span>}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium">{transaction.title}</p>

                          {transaction.description && (
                            <p className="truncate text-xs text-muted-foreground">
                              {transaction.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {transaction.category.name}
                      </span>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {formatDate(transaction.date)}
                    </TableCell>

                    <TableCell
                      className={`text-right font-semibold tabular-nums ${
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-foreground"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg cursor-pointer"
                          onClick={() => onEdit(transaction)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg text-destructive hover:text-destructive cursor-pointer"
                          onClick={() => onDelete(transaction)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {transactions.length} transactions
        </p>

        {totalPages > 1 && (
          <Pagination className="mx-0 w-auto justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (currentPage > 1) {
                      onChangePage(currentPage - 1);
                    }
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      className={cn({
                        "pointer-events-none opacity-50": page === currentPage,
                      })}
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        onChangePage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();

                    if (currentPage < totalPages) {
                      onChangePage(currentPage + 1);
                    }
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
