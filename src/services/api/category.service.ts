import { apiClient } from "@/lib/axios/axios";
import {
  CreateCategoryInput,
  GetCategoriesInput,
  UpdateCategoryInput,
} from "@/validations/category.validation";
import apiEndpoint from "./endpoint.constants";
import { GetCategoriesResponse } from "@/types/category";

const categoryServices = {
  getCategories: (params?: GetCategoriesInput) =>
    apiClient.get<GetCategoriesResponse>(apiEndpoint.CATEGORIES, { params }),

  getCategoryById: (id: string) =>
    apiClient.get(`${apiEndpoint.CATEGORIES}/${id}`),

  createCategory: (payload: CreateCategoryInput) =>
    apiClient.post(apiEndpoint.CATEGORIES, payload),

  updateCategory: (id: string, payload: UpdateCategoryInput) =>
    apiClient.patch(`${apiEndpoint.CATEGORIES}/${id}`, payload),

  deleteCategory: (id: string) =>
    apiClient.delete(`${apiEndpoint.CATEGORIES}/${id}`),
};

export default categoryServices;
