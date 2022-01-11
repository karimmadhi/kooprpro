import gql from "graphql-tag";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      business {
        id
        name
        isValidated
        hasEvents
      }
    }
  }
`;

const checkLoggedIn = (apolloClient) =>
  apolloClient
    .query({
      query: ME_QUERY,
    })
    .then(({ data }: any) => {
      if (!data) return { me: null };
      return { me: data.me };
    })
    .catch((e: any) => {
      // Fail gracefully
      return { me: null };
    });

export default checkLoggedIn;
