import { gql } from "@apollo/client";

export const ME_FRAGMENT = gql`
  fragment Me on User {
    username
    email
    avatar
  }
`;
