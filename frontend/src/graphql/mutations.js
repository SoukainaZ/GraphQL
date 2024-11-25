import { gql } from "@apollo/client";

export const SAVE_COMPTE = gql`
  mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      type
      dateCreation
    }
  }
`;
