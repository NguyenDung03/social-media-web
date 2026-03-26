import type { TBrand, TFormBrand } from "../types/brand.type";
import type {
  TQueryParams,
  TResponseDetail,
  TResponseNoPagination,
} from "../types/common.type";
import { axiosInstance } from "../lib/axios";
export const brandApi = {
  getBrands: async (
    params?: TQueryParams,
  ): Promise<TResponseNoPagination<TBrand>> => {
    const response = await axiosInstance.get<TResponseNoPagination<TBrand>>(
      `/brand/get-all-brands`,
      {
        params,
      },
    );
    return response.data;
  },
  createBrand: async (body: TFormBrand): Promise<TResponseDetail<TBrand>> => {
    const response = await axiosInstance.post<TResponseDetail<TBrand>>(
      `/brand/create-brand`,
      body,
    );
    return response.data;
  },
  updateBrand: async (body: TBrand): Promise<TResponseDetail<TBrand>> => {
    const { _id, ...rest } = body;
    const response = await axiosInstance.patch<TResponseDetail<TBrand>>(
      `/brand/update-brand/${_id}`,
      rest,
    );
    return response.data;
  },
};
