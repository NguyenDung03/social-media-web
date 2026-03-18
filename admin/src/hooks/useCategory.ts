import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { categoryApi } from "../apis/category.api";
import type { TCategory, TFormCategory } from "../types/category.type";
import type {
  TBaseResponseDelete,
  TQueryParams,
  TResponseDetail,
  TResponseNoPagination,
} from "../types/common.type";

// 1. Hook get all categories
export const useGetCategories = (
  params?: TQueryParams,
): UseQueryResult<TResponseNoPagination<TCategory>, Error> => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoryApi.getCategories(params),
  });
};

// 3. Hook create category
export const useAddCategory = (): UseMutationResult<
  TResponseDetail<TCategory>,
  Error,
  TFormCategory
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// 4. Hook update category
export const useUpdateCategory = (): UseMutationResult<
  TResponseDetail<TCategory>,
  Error,
  TCategory
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.updateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", data.data._id] });
    },
  });
};

// 5. Hook delete category
export const useDeleteCategory = (): UseMutationResult<
  TBaseResponseDelete,
  Error,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
