import { gql } from "@apollo/client";

export const GET_ALL_COMPTES = gql`
  query {
    allComptes {
      id
      solde
      type
      dateCreation
    }
  }
`;

export const DELETE_COMPTE = gql`
  query DeleteCompte($id: ID!) {
    deleteCompte(id: $id)
  }
`;
