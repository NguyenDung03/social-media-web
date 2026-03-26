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
export const useGetCategories = (
  params?: TQueryParams,
): UseQueryResult<TResponseNoPagination<TCategory>, Error> => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoryApi.getCategories(params),
  });
};
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
