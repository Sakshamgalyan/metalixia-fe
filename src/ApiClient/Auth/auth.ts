import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import {
  LoginPayload,
  LoginResponse,
  ProfileResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  VerifyOtpPayload,
} from "./type";

export const loginApi = async (data: LoginPayload) => {
  try {
    const response: LoginResponse = await ApiClient.post("/auth/login", data);
    toast.success("Login Successful", {
      description: "Welcome back! 👋",
      duration: 3000,
    });
    return response;
  } catch (error: any) {
    toast.error("Login Failed", {
      description:
        error?.response?.data?.message ||
        "Invalid credentials. Please try again.",
      duration: 4000,
    });
    throw error;
  }
};

export const registerApi = async (data: RegisterPayload) => {
  try {
    const response: RegisterResponse = await ApiClient.post(
      "/auth/register",
      data,
    );
    toast.success("Registration Successful", {
      description: "Your account has been created! 🎉",
      duration: 3000,
    });
    return response;
  } catch (error: any) {
    toast.error("Registration Failed", {
      description:
        error?.response?.data?.message ||
        "Unable to create account. Please try again.",
      duration: 4000,
    });
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await ApiClient.post("/auth/logout");
    toast.info("Logged Out", {
      description: "You have been successfully logged out.",
      duration: 3000,
    });
    return response;
  } catch (error: any) {
    toast.error("Logout Failed", {
      description:
        error?.response?.data?.message || "An error occurred during logout.",
      duration: 4000,
    });
    throw error;
  }
};

export const profileApi = async () => {
  const response: ProfileResponse = await ApiClient.get("/auth/profile");
  return response.user;
};

export const sendOtpApi = async (data: { email: string }) => {
  try {
    const response = await ApiClient.post("/email/send-otp", data);
    toast.success("OTP Sent", {
      description: "Please check your email for the verification code.",
      duration: 3000,
    });
    return response;
  } catch (error: any) {
    toast.error("Failed to send OTP", {
      description:
        error?.response?.data?.message || "Could not send verification email. Please try again.",
      duration: 4000,
    });
    throw error;
  }
};

export const verifyOtpApi = async (data: VerifyOtpPayload) => {
  try {
    const response = await ApiClient.post("/email/verify-otp", data);
    toast.success("Verification Successful", {
      description: "Your email has been verified! 🎉",
      duration: 3000,
    });
    return response;
  } catch (error: any) {
    toast.error("Verification Failed", {
      description:
        error?.response?.data?.message || "Invalid or expired OTP. Please try again.",
      duration: 4000,
    });
    throw error;
  }
};

export const forgotPasswordApi = async (data: { email: string }) => {
  try {
    const response = await ApiClient.post("/auth/forgot-password", data);
    toast.success("OTP Sent", {
      description: "Please check your email for the recovery code.",
      duration: 3000,
    });
    return response;
  } catch (error: any) {
    toast.error("Process Failed", {
      description:
        error?.response?.data?.message || "Could not send recovery email. Please try again.",
      duration: 4000,
    });
    throw error;
  }
};

export const resetPasswordApi = async (data: ResetPasswordPayload) => {
  try {
    const response: ResetPasswordResponse = await ApiClient.post(
      "/auth/reset-password",
      data,
    );
    toast.success("Password Updated", {
      description: "Your password has been reset successfully! 🔑",
      duration: 3000,
    });
    return response;
  } catch (error: any) {
    toast.error("Reset Failed", {
      description:
        error?.response?.data?.message || "Invalid OTP or error resetting password.",
      duration: 4000,
    });
    throw error;
  }
};