import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z, ZodError } from "zod";
import { AppError } from "@/exceptions/AppError";

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResult<T> = {
  data: T[];
  pagination: PaginationMeta;
};

export function successResponse<T>(
  data: T,
  message = "Success",
  statusCode = 200,
) {
  return NextResponse.json(
    {
      meta: {
        success: true,
        statusCode,
        message,
      },
      data,
    },
    {
      status: statusCode,
    },
  );
}

export function createdResponse<T>(data: T, message = "Created successfully") {
  return successResponse(data, message, 201);
}

export function paginatedResponse<T>(
  data: T[],
  pagination: PaginationMeta,
  message = "Success",
) {
  return NextResponse.json(
    {
      meta: {
        success: true,
        statusCode: 200,
        message,
      },
      data,
      pagination,
    },
    {
      status: 200,
    },
  );
}

export function errorResponse(
  error: unknown,
  message = "Internal Server Error",
) {
  if (error instanceof ZodError) {
    const { fieldErrors } = z.flattenError(error);
    return NextResponse.json(
      {
        meta: {
          success: false,
          statusCode: 400,
          message: "Validation failed",
        },
        errors: fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        meta: {
          success: false,
          statusCode: error.statusCode,
          message: error.message,
          code: error.code,
        },
      },
      {
        status: error.statusCode,
      },
    );
  }

  if (error instanceof mongoose.Error) {
    return NextResponse.json(
      {
        meta: {
          success: false,
          statusCode: 500,
          message: error.message,
        },
      },
      {
        status: 500,
      },
    );
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: number }).code === 11000
  ) {
    return NextResponse.json(
      {
        meta: {
          success: false,
          statusCode: 409,
          message: "Duplicate data found",
        },
      },
      {
        status: 409,
      },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        meta: {
          success: false,
          statusCode: 500,
          message: error.message,
        },
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    {
      meta: {
        success: false,
        statusCode: 500,
        message,
      },
    },
    {
      status: 500,
    },
  );
}

export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json(
    {
      meta: {
        success: false,
        statusCode: 401,
        message,
      },
    },
    {
      status: 401,
    },
  );
}

export function forbiddenResponse(message = "Forbidden") {
  return NextResponse.json(
    {
      meta: {
        success: false,
        statusCode: 403,
        message,
      },
    },
    {
      status: 403,
    },
  );
}

export function notFoundResponse(message = "Resource not found") {
  return NextResponse.json(
    {
      meta: {
        success: false,
        statusCode: 404,
        message,
      },
    },
    {
      status: 404,
    },
  );
}

export function conflictResponse(message = "Conflict") {
  return NextResponse.json(
    {
      meta: {
        success: false,
        statusCode: 409,
        message,
      },
    },
    {
      status: 409,
    },
  );
}

export function badRequestResponse(message = "Bad Request") {
  return NextResponse.json(
    {
      meta: {
        success: false,
        statusCode: 400,
        message,
      },
    },
    {
      status: 400,
    },
  );
}
