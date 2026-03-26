import { axiosInstance } from "../lib/axios";
import type {
  TBaseResponseDelete,
  TQueryParams,
  TResponse,
  TResponseDetail,
} from "../types/common.type";
import type {
  TProduct,
  TProductForm,
  TProductFormEdit,
} from "../types/product.type";
export const productApi = {
  getAllProducts: async (
    params?: TQueryParams,
  ): Promise<TResponse<TProduct>> => {
    const response = await axiosInstance.get<TResponse<TProduct>>(
      "/product/get-all-product",
      {
        params,
      },
    );
    return response.data;
  },
  getProductsWithStatus: async (
    status: string,
    deleted: boolean,
    params?: TQueryParams,
  ): Promise<TResponse<TProduct>> => {
    const response = await axiosInstance.get<TResponse<TProduct>>(
      `/product/get-product-with-status/${status}/${deleted}`,
      { params },
    );
    return response.data;
  },
  addProduct: async (
    data: TProductForm,
  ): Promise<TResponseDetail<TProduct>> => {
    const response = await axiosInstance.post<TResponseDetail<TProduct>>(
      "/product/add-product",
      data,
    );
    return response.data;
  },
  updateProductStatus: async (
    productId: string,
  ): Promise<TResponseDetail<TProduct>> => {
    const response = await axiosInstance.patch<TResponseDetail<TProduct>>(
      `/product/update-product-status/${productId}`,
    );
    return response.data;
  },
  updateProduct: async (
    data: TProductFormEdit,
  ): Promise<TResponseDetail<TProduct>> => {
    const { _id, ...body } = data;
    const response = await axiosInstance.put<TResponseDetail<TProduct>>(
      `/product/update-product/${_id}`,
      body,
    );
    return response.data;
  },
  deleteProduct: async (productId: string): Promise<TBaseResponseDelete> => {
    const response = await axiosInstance.delete<TBaseResponseDelete>(
      `/product/delete-product/${productId}`,
    );
    return response.data;
  },
  deleteMultipleProducts: async (
    ids: string[],
  ): Promise<TBaseResponseDelete> => {
    const response = await axiosInstance.delete<TBaseResponseDelete>(
      "/product/hard-delete-multiple-product",
      {
        params: { id: ids },
      },
    );
    return response.data;
  },
  softDeleteProduct: async (
    productId: string,
  ): Promise<TResponseDetail<TProduct>> => {
    const response = await axiosInstance.patch<TResponseDetail<TProduct>>(
      `/product/soft-delete-product/${productId}`,
    );
    return response.data;
  },
};
