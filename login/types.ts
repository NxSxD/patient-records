export interface AuthResponse {
  login: {
    token: string;
  };
}

export interface LoginVariables {
  email: string;
  password: string;
}
