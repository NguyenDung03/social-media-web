import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { brandApi } from "../apis/brand.api";
import type { TBrand, TFormBrand } from "../types/brand.type";
import type {
  TQueryParams,
  TResponseDetail,
  TResponseNoPagination,
} from "../types/common.type";

// ================= TANSTACK QUERY HOOKS =================

// 1. Hook get all brands
export const useGetBrands = (
  params?: TQueryParams,
): UseQueryResult<TResponseNoPagination<TBrand>, Error> => {
  return useQuery({
    queryKey: ["brands", params],
    queryFn: () => brandApi.getBrands(params),
  });
};

// 3. Hook create brand
export const useAddBrand = (): UseMutationResult<
  TResponseDetail<TBrand>,
  Error,
  TFormBrand
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: brandApi.createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

// 4. Hook update brand
export const useUpdateBrand = (): UseMutationResult<
  TResponseDetail<TBrand>,
  Error,
  TBrand
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: brandApi.updateBrand,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      queryClient.invalidateQueries({ queryKey: ["brand", data.data._id] });
    },
  });
};
