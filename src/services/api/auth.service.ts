import { apiClient } from "@/lib/axios/axios";
import apiEndpoint from "./endpoint.constants";
import {
  LoginInput,
  RegisterInput,
  ResendActivationEmailInput,
  VerifyEmailInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "@/validations/auth.validation";

const authServices = {
  register: (payload: RegisterInput) =>
    apiClient.post(`${apiEndpoint.AUTH}/register`, payload),

  verifyEmail: (payload: VerifyEmailInput) =>
    apiClient.post(`${apiEndpoint.AUTH}/verify-email`, payload),

  resendActivationEmail: (payload: ResendActivationEmailInput) =>
    apiClient.post(`${apiEndpoint.AUTH}/resend-activation`, payload),

  login: (payload: LoginInput) =>
    apiClient.post(`${apiEndpoint.AUTH}/login`, payload),

  forgotPassword: (payload: ForgotPasswordInput) =>
    apiClient.post(`${apiEndpoint.AUTH}/forgot-password`, payload),

  resetPassword: (payload: ResetPasswordInput) =>
    apiClient.post(`${apiEndpoint.AUTH}/reset-password`, payload),

  getMe: () => apiClient.get(`${apiEndpoint.AUTH}/me`),

  logout: () => apiClient.post(`${apiEndpoint.AUTH}/logout`),
};

export default authServices;
