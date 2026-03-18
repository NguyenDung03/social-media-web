import type { TFormVoucher, TVoucher } from "../types/voucher.type";
import type {
  TQueryParams,
  TResponseDetail,
  TResponseNoPagination,
} from "../types/common.type";
import { axiosInstance } from "../lib/axios";

// ================= API CALLS =================

export const voucherApi = {
  // 1. Get all vouchers
  getVouchers: async (
    params?: TQueryParams,
  ): Promise<TResponseNoPagination<TVoucher>> => {
    const response = await axiosInstance.get<TResponseNoPagination<TVoucher>>(
      `/voucher/get-vouchers`,
      {
        params,
      },
    );
    return response.data;
  },

  // 3. Create voucher
  createVoucher: async (
    body: TFormVoucher,
  ): Promise<TResponseDetail<TVoucher>> => {
    const response = await axiosInstance.post<TResponseDetail<TVoucher>>(
      `/voucher/create-voucher`,
      body,
    );
    return response.data;
  },

  // 4. Update voucher
  updateVoucher: async (body: TVoucher): Promise<TResponseDetail<TVoucher>> => {
    const { _id, ...rest } = body;
    const response = await axiosInstance.patch<TResponseDetail<TVoucher>>(
      `/voucher/update-voucher/${_id}`,
      rest,
    );
    return response.data;
  },
};
