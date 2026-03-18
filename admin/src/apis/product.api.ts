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

// ================= API CALLS =================

export const productApi = {
  // 1. Get all products with pagination and search
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

  // 3. Get products with status and deleted flag
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

  // 4. Add product
  addProduct: async (
    data: TProductForm,
  ): Promise<TResponseDetail<TProduct>> => {
    const response = await axiosInstance.post<TResponseDetail<TProduct>>(
      "/product/add-product",
      data,
    );
    return response.data;
  },

  // 5. Update product status (Toggle active/inactive)
  updateProductStatus: async (
    productId: string,
  ): Promise<TResponseDetail<TProduct>> => {
    const response = await axiosInstance.patch<TResponseDetail<TProduct>>(
      `/product/update-product-status/${productId}`,
    );
    return response.data;
  },

  // 6. Update product by ID
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

  // 7. Hard delete product
  deleteProduct: async (productId: string): Promise<TBaseResponseDelete> => {
    const response = await axiosInstance.delete<TBaseResponseDelete>(
      `/product/delete-product/${productId}`,
    );
    return response.data;
  },

  // 8. Hard delete multiple products
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

  // 9. Soft delete product (Toggle is_deleted)
  softDeleteProduct: async (
    productId: string,
  ): Promise<TResponseDetail<TProduct>> => {
    const response = await axiosInstance.patch<TResponseDetail<TProduct>>(
      `/product/soft-delete-product/${productId}`,
    );
    return response.data;
  },
};
