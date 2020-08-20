import { gql } from "@apollo/react-hooks";

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
