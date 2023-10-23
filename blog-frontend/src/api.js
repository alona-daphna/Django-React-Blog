import { gql } from '@apollo/client';

export const GET_ARTICLE = gql`
  query {
    articleById(id: 2) {
      id
      title
      content
    }
  }
`;

// export const GET_ALL_ARTICLES = gql`
//     query articleById("id": 2) {
//       id
//       title
//       content
//     }
//     `;
