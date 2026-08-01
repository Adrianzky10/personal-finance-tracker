export type ApiErrorResponse = {
  meta?: {
    success?: boolean;
    statusCode?: number;
    message?: string;
    code?: string;
  };
  errors?: Record<string, string | string[]>;
};
