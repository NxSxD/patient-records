import { gql } from "@apollo/react-hooks";

export interface AuthResponse {
  login: {
    token: string;
  };
}

export interface LoginVariables {
  email: string;
  password: string;
}

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(credentials: {
      email: $email,
      password: $password
    }) {
      token
    }
  }
`;
