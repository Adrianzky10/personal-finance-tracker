"use client";

import { Pencil, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

import { ITransactionResponseData } from "@/types/transaction";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

interface TransactionTableProps {
  transactions: ITransactionResponseData[];
}

export default function TransactionTable({
  transactions,
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

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input placeholder="Search title..." className="pl-9 rounded-xl" />
          </div>

          {/* Filter */}
          <div className="flex rounded-xl bg-muted p-1 justify-center md:justify-start">
            <Button size="sm" variant="default" className="rounded-lg">
              All
            </Button>

            <Button size="sm" variant="ghost" className="rounded-lg">
              Income
            </Button>

            <Button size="sm" variant="ghost" className="rounded-lg">
              Expense
            </Button>
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
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "income";

              return (
                <TableRow key={transaction.id}>
                  {/* Transaction */}
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

                  {/* Category */}
                  <TableCell>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {transaction.category.name}
                    </span>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-muted-foreground">
                    {formatDate(transaction.date)}
                  </TableCell>

                  {/* Amount */}
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

                  {/* Actions */}
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {transactions.length} transactions
        </p>

        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
