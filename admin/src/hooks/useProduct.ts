import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { productApi } from "../apis/product.api";
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

// 1. Hook get all products
export const useGetProducts = (
  params?: TQueryParams,
): UseQueryResult<TResponse<TProduct>, Error> => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productApi.getAllProducts(params),
  });
};

// 3. Hook get products with status/deleted
export const useGetProductsWithStatus = (
  status: string,
  deleted: boolean,
  params?: TQueryParams,
): UseQueryResult<TResponse<TProduct>, Error> => {
  return useQuery({
    queryKey: ["products", status, deleted, params],
    queryFn: () => productApi.getProductsWithStatus(status, deleted, params),
  });
};

// 4. Hook add product
export const useAddProduct = (): UseMutationResult<
  TResponseDetail<TProduct>,
  Error,
  TProductForm
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productApi.addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// 5. Hook update product status
export const useUpdateProductStatus = (): UseMutationResult<
  TResponseDetail<TProduct>,
  Error,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productApi.updateProductStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// 6. Hook update product detail
export const useUpdateProduct = (): UseMutationResult<
  TResponseDetail<TProduct>,
  Error,
  TProductFormEdit
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productApi.updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", data.data._id] });
    },
  });
};

// 7. Hook hard delete product
export const useDeleteProduct = (): UseMutationResult<
  TBaseResponseDelete,
  Error,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// 8. Hook hard delete multiple products
export const useDeleteMultipleProducts = (): UseMutationResult<
  TBaseResponseDelete,
  Error,
  string[]
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productApi.deleteMultipleProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// 9. Hook soft delete product
export const useSoftDeleteProduct = (): UseMutationResult<
  TResponseDetail<TProduct>,
  Error,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productApi.softDeleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
