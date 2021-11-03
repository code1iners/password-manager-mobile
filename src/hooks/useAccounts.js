import { gql } from "@apollo/client";

const CREATE_ACCOUNT = gql`
    query getAccounts {
        getAccounts {

        }
    }
`;

const useAccount = () => {
  const createAccount = () => {};

  return {
    createAccount,
  };
};

export default useAccount;
