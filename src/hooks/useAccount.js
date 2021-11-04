import { gql, useMutation } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $title: String!
    $subtitle: String
    $accountName: String!
    $password: String!
    $thumbnail: String
  ) {
    createAccount(
      title: $title
      subtitle: $subtitle
      accountName: $accountName
      password: $password
      thumbnail: $thumbnail
    ) {
      ok
      error
    }
  }
`;

/**
 * ### Account hooks.
 */
const useAccount = () => {
  const [createAccountMutation, { loading: createAccountLoading }] =
    useMutation(CREATE_ACCOUNT_MUTATION);

  /**
   * ### Create account hook.
   * @param {String} title > Account title.
   * @param {String} subtitle > Account subtitle.
   * @param {String} accountName > Account accountName.
   * @param {String} password > Account password.
   * @param {String} thumbnail > Account thumbnail.
   * @returns {Object} ok (True or False), error (String)
   */
  const createAccount = async ({
    title,
    subtitle,
    accountName,
    password,
    thumbnail,
  }) => {
    if (!createAccountLoading) {
      const {
        data: {
          createAccount: { ok, error },
        },
      } = await createAccountMutation({
        variables: {
          title,
          subtitle,
          accountName,
          password,
          thumbnail,
        },
      });

      return { ok, error };
    }
  };

  return {
    createAccount,
  };
};

export default useAccount;
