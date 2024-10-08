import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { loginApi } from "@api/userApi";
import { getErrorMessage, ROLES_IDS } from "@utils/common";
import axios, { AxiosResponse } from "axios";
import { Roles, User } from "user";

interface VerifyOTPResponse {
  user: User;
  token: string;
}
interface AuthStoreStates {
  accessToken?: string;
  user: User | null;
  loginFrom: "password" | "login" | "external" | "guest";
  error: null | string;
  otp?: string;
  isAuthenticated: boolean;
}
interface AuthStoreActions {
  login: (loginData: TLogin) => Promise<void>;
  logout: () => Promise<void>;
  verifyOtp: (verifyData: TVerifyOtp) => Promise<void>;
}

interface TLogin {
  email: string;
  password: string;
}

interface TVerifyOtp {
  email: string;
  otp: string;
}

const initialStates: AuthStoreStates = {
  user: null,
  loginFrom: "guest",
  error: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStoreStates & AuthStoreActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialStates,
        login: async (payload: TLogin) => {
          set({ error: null });
          try {
            const response = await axios.post(
              import.meta.env.VITE_API_SERVICE_BASE_URL + loginApi.LOGIN,
              payload,
            );

            if (import.meta.env.DEV) {
              const data = response?.data ?? "";
              const otp = data.split(":")[1]?.trim();
              if (otp) set({ otp });
            }
          } catch (error) {
            const errorMessage = getErrorMessage(error);
            set({ error: errorMessage });
          }
        },
        logout: async () => {
          set(initialStates);
          localStorage.clear();
          window.location.href = "/login";
        },
        verifyOtp: async (payload: TVerifyOtp) => {
          set(initialStates);
          try {
            const response: AxiosResponse<VerifyOTPResponse> = await axios.post(
              import.meta.env.VITE_API_SERVICE_BASE_URL + loginApi.VERIFY_OTP,
              payload,
            );

            if (response.status === 200 && response.data) {
              const user = response.data.user;
              const accessToken = response.data.token;
              if (user.roles && user.roles.length) {
                const roleId = user.roles[0];
                const role = ROLES_IDS[roleId] as Roles;

                const userWithRole: User = { ...user, role };
                set({
                  user: userWithRole,
                  accessToken,
                  loginFrom: "password",
                  isAuthenticated: true,
                });
              } else {
                set({ error: "User has no assigned roles." });
              }
            }
          } catch (error) {
            const errorMessage = getErrorMessage(error);
            set({ error: errorMessage });
          }
        },
      }),
      {
        name: "authStore",
        partialize(state) {
          const { isAuthenticated, loginFrom, user, accessToken } = state;
          return { isAuthenticated, loginFrom, user, accessToken };
        },
      },
    ),
  ),
);
