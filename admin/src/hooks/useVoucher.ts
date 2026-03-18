import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { voucherApi } from "../apis/voucher.api";
import type { TFormVoucher, TVoucher } from "../types/voucher.type";
import type {
  TQueryParams,
  TResponseDetail,
  TResponseNoPagination,
} from "../types/common.type";

// ================= TANSTACK QUERY HOOKS =================

// 1. Hook get all vouchers
export const useGetVouchers = (
  params?: TQueryParams,
): UseQueryResult<TResponseNoPagination<TVoucher>, Error> => {
  return useQuery({
    queryKey: ["vouchers", params],
    queryFn: () => voucherApi.getVouchers(params),
  });
};

// 3. Hook create voucher
export const useAddVoucher = (): UseMutationResult<
  TResponseDetail<TVoucher>,
  Error,
  TFormVoucher
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: voucherApi.createVoucher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
  });
};

// 4. Hook update voucher
export const useUpdateVoucher = (): UseMutationResult<
  TResponseDetail<TVoucher>,
  Error,
  TVoucher
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: voucherApi.updateVoucher,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      queryClient.invalidateQueries({ queryKey: ["voucher", data.data._id] });
    },
  });
};
