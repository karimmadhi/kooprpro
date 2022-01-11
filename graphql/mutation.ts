import gql from "graphql-tag";

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($password: String!, $resetPasswordToken: String!) {
    resetPassword(password: $password, resetPasswordToken: $resetPasswordToken)
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
