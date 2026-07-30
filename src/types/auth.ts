export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  message: string;
}

export interface JwtPayload {
  email: string;
}

export interface VerifyEmailResponse {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

export interface ResendActivationEmailResponse {
  email: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}
