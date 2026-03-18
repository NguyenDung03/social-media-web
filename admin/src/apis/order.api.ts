import type { TCancelOrder, TOrder, TOrderStatus } from "../types/order.type";
import type {
  TQueryParams,
  TResponseDetail,
  TResponse,
} from "../types/common.type";
import { axiosInstance } from "../lib/axios";

// ================= API CALLS =================

export const orderApi = {
  // 1. Get all orders (Admin)
  getAllOrders: async (params?: TQueryParams): Promise<TResponse<TOrder>> => {
    const response = await axiosInstance.get<TResponse<TOrder>>(
      `/order/get-all-orders`,
      {
        params,
      },
    );
    return response.data;
  },

  // 4. Update order status (Admin)
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

  // 5. Cancel order
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
