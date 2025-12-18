import { axiosInstance } from "@/lib/axios";

export const userApi = {
  getSuggestedUsers: async () => {
    const response = await axiosInstance.get("/auth/suggested", {
      withCredentials: true,
    });
    return response.data;
  },
};
