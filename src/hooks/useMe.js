import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import client, { tokenVar } from "../../apollo";
import { userSignOut } from "./useAuth";

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      username
      firstName
      lastName
      avatar
      createdAt
      updatedAt
    }
  }
`;

/**
 * ### Get my information.
 * @returns User object.
 */
const useMe = () => {
  // Token.
  const hasToken = useReactiveVar(tokenVar);

  // Fetching.
  const { data } = useQuery(ME_QUERY, {
    skip: !Boolean(hasToken),
  });

  // Watching.
  useEffect(() => {
    if (data?.me === null) {
      userSignOut();
    }
  }, [data]);

  return data?.me;
};

export default useMe;
