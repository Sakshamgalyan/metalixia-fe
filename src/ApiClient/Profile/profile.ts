import ApiClient from "@/lib/apiClient";

export interface UpdateProfileData {
  name?: string;
  email?: string;
  mobileNo?: string;
  post?: string;
  description?: string;
  address?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const updateProfileApi = async (data: UpdateProfileData) => {
  const response: any = await ApiClient.put("/auth/update-profile", data);
  return response; // ApiClient already returns res.data
};

export const changePasswordApi = async (data: ChangePasswordData) => {
  const response: any = await ApiClient.post("/auth/change-password", data);
  return response; // ApiClient already returns res.data
};

export const uploadProfilePictureApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response: any = await ApiClient.post(
    "/auth/upload-profile-picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response; // ApiClient already returns res.data
};

export const searchEmployeesApi = async (
  search: string = "",
  page: number = 1,
  limit: number = 20,
) => {
  const response: any = await ApiClient.get("/auth/search-employees", {
    params: { search, page, limit },
  });
  return response; // ApiClient already returns res.data
};

export const getEmployeeProfileApi = async (employeeId: string) => {
  const response: any = await ApiClient.get(`/auth/employee/${employeeId}`);
  return response; // ApiClient already returns res.data
};
