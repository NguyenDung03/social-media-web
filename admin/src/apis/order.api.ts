import type { TCancelOrder, TOrder, TOrderStatus } from "../types/order.type";
import type {
  TQueryParams,
  TResponseDetail,
  TResponse,
} from "../types/common.type";
import { axiosInstance } from "../lib/axios";
export const orderApi = {
  getAllOrders: async (params?: TQueryParams): Promise<TResponse<TOrder>> => {
    const response = await axiosInstance.get<TResponse<TOrder>>(
      `/order/get-all-orders`,
      {
        params,
      },
    );
    return response.data;
  },
  updateOrder: async (data: {
    orderId: string;
    status: TOrderStatus;
  }): Promise<TResponseDetail<TOrder>> => {
    const { orderId, status } = data;
    const response = await axiosInstance.patch<TResponseDetail<TOrder>>(
      `/order/update-order/${orderId}`,
      { status },
    );
    return response.data;
  },
  cancelOrder: async (data: {
    orderId: string;
    reasonCancel: string;
  }): Promise<TResponseDetail<TCancelOrder>> => {
    const { orderId, reasonCancel } = data;
    const response = await axiosInstance.patch<TResponseDetail<TCancelOrder>>(
      `/order/cancel-order/${orderId}`,
      { reasonCancel },
    );
    return response.data;
  },
};
