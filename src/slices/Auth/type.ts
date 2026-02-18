export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  mobileNo?: string;
  employeeId?: string;
  isEmailVerified?: boolean;
  post?: string;
  profilePicture?: string;
  description?: string;
  address?: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
