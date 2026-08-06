import { queryKeys } from "@/lib/queryKeys";
import categoryServices from "@/services/api/category.service";
import { GetCategoriesInput } from "@/validations/category.validation";
import { useQuery } from "@tanstack/react-query";

export function useCategories(params?: GetCategoriesInput) {
  return useQuery({
    queryKey: queryKeys.categories(params),

    queryFn: async () => {
      const { data } = await categoryServices.getCategories(params);

      return data;
    },
  });
}
