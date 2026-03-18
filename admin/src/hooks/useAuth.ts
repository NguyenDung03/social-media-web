import {
  useMutation,
  type UseMutateFunction,
  type UseMutateAsyncFunction,
} from "@tanstack/react-query";
import { userApi } from "../apis/user.api";
import { ERole } from "../types/role.type";
import { useNavigate } from "react-router-dom";
import type { TLogin, TUser } from "../types/user.type";

export const useAuth = (): {
  login: UseMutateFunction<TUser, Error, TLogin, unknown>;
  loginAsync: UseMutateAsyncFunction<TUser, Error, TLogin, unknown>;
  isLoading: boolean;
  error: Error | null;
  user: TUser | undefined;
} => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (body: TLogin) => {
      const data = await userApi.login(body);
      // Kiểm tra role: Nếu là customer thì không được đăng nhập admin
      if (data.role === ERole.CUSTORMER) {
        throw new Error(
          "Tài khoản của bạn không có quyền truy cập trang quản trị!",
        );
      }
      return data;
    },
    onSuccess: (data) => {
      // Lưu user vào localStorage hoặc state tùy project
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("Login Error:", error.message);
      navigate("/login");
    },
  });

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    user: loginMutation.data,
  };
};
