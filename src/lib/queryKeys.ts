export const queryKeys = {
  categories: (params?: unknown) => ["categories", params] as const,
  currentUser: () => ["current-user"] as const,
};
