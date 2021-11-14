import { gql, useMutation, useQuery } from "@apollo/client";

export const GET_ACCOUNT_QUERY = gql`
  query getAccountsWithPage($offset: Int, $take: Int) {
    getAccountsWithPage(offset: $offset, take: $take) {
      id
      title
      subtitle
      accountName
      accountPassword
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $title: String!
    $subtitle: String
    $accountName: String!
    $accountPassword: String!
    $thumbnail: Upload
  ) {
    createAccount(
      title: $title
      subtitle: $subtitle
      accountName: $accountName
      accountPassword: $accountPassword
      thumbnail: $thumbnail
    ) {
      id
      title
      subtitle
      thumbnail
      accountName
      accountPassword
    }
  }
`;

export const DELETE_ACCOUNT_MUTATION = gql`
  mutation deleteAccount($id: Int!) {
    deleteAccount(id: $id) {
      ok
      error
    }
  }
`;

/**
 * ### Account hooks.
 */
const useAccount = () => {
  /**
   * ### Get account hook.
   * @returns {Array} > [Account]
   */
  const getAccounts = () => {
    return useQuery(GET_ACCOUNT_QUERY);
  };

  const updateAccount = (cache, result) => {
    const {
      data: { createAccount },
    } = result;

    const newAccountRef = cache.writeFragment({
      data: createAccount,
      fragment: gql`
        fragment NewAccount on Account {
          id
          title
          subtitle
          accountName
          accountPassword
          thumbnail
        }
      `,
    });

    cache.modify({
      fields: {
        accounts(prev) {
          return [...prev, newAccountRef];
        },
      },
    });
  };

  const [createAccountMutation, { loading: createAccountLoading }] =
    useMutation(CREATE_ACCOUNT_MUTATION, {
      update: updateAccount,
    });

  /**
   * ### Create account hook.
   * @param {String} title > Account title.
   * @param {String} subtitle > Account subtitle.
   * @param {String} accountName > Account accountName.
   * @param {String} accountPassword > Account accountPassword.
   * @param {String} thumbnail > Account thumbnail.
   * @returns {Object} ok (True or False), error (String)
   */
  const createAccount = async ({
    title,
    subtitle,
    accountName,
    accountPassword,
    thumbnail,
  }) => {
    if (!createAccountLoading) {
      const response = await createAccountMutation({
        variables: {
          title,
          subtitle,
          accountName,
          accountPassword,
          thumbnail,
        },
      });

      return response;
    }
  };

  const [deleteAccountMutation, { loading: deleteAccountLoading }] =
    useMutation(DELETE_ACCOUNT_MUTATION);
  /**
   * ### Delete Account hook.
   * @param {Number} > Account id.
   * @returns {Object} ok (True or False), error (String)
   */
  const deleteAccount = async ({ id }) => {
    if (!deleteAccountLoading) {
      const {
        data: {
          deleteAccount: { ok, error },
        },
      } = await deleteAccountMutation({
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              accounts(existingAccountRefs, { readField }) {
                return existingAccountRefs.filter(
                  (accountRef) => id !== readField("id", accountRef)
                );
              },
            },
          });
        },
      });

      return ok, error;
    }
  };

  return {
    getAccounts,
    createAccount,
    deleteAccount,
  };
};

export default useAccount;
