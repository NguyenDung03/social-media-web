import type { TCategory, TFormCategory } from "../types/category.type";
import type {
  TBaseResponseDelete,
  TQueryParams,
  TResponseDetail,
  TResponseNoPagination,
} from "../types/common.type";
import { axiosInstance } from "../lib/axios";

export const categoryApi = {
  // 1. Get all categories
  getCategories: async (
    params?: TQueryParams,
  ): Promise<TResponseNoPagination<TCategory>> => {
    const response = await axiosInstance.get<TResponseNoPagination<TCategory>>(
      `/category/get-categories`,
      {
        params,
      },
    );
    return response.data;
  },

  // 3. Create category
  createCategory: async (
    body: TFormCategory,
  ): Promise<TResponseDetail<TCategory>> => {
    const response = await axiosInstance.post<TResponseDetail<TCategory>>(
      `/category/create-category`,
      body,
    );
    return response.data;
  },

  // 4. Update category
  updateCategory: async (
    body: TCategory,
  ): Promise<TResponseDetail<TCategory>> => {
    const { _id, ...rest } = body;
    const response = await axiosInstance.patch<TResponseDetail<TCategory>>(
      `/category/update-category-by-id/${_id}`,
      rest,
    );
    return response.data;
  },

  // 5. Delete category
  deleteCategory: async (id: string): Promise<TBaseResponseDelete> => {
    const response = await axiosInstance.delete<TBaseResponseDelete>(
      `/category/delete-category-by-id/${id}`,
    );
    return response.data;
  },
};
