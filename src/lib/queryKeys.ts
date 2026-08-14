export const queryKeys = {
  categories: (params?: unknown) => ["categories", params] as const,
  currentUser: () => ["current-user"] as const,
  transactions: (params?: unknown) =>
    params === undefined
      ? (["transactions"] as const)
      : (["transactions", params] as const),

  dashboard: (months?: number) => ["dashboard", months] as const,
};
