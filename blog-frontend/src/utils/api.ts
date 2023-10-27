import { gql } from '@apollo/client';
import { Article } from './types';

const BASE_URL = 'http://localhost:8000/blog/';

// REST
export const fetchAllArticles = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(response.status + ': Failed to fetch articles: ' + error);
  }

  return response.json();
};

export const fetchArticleById = async (articleId: Number) => {
  const response = await fetch(BASE_URL + articleId);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(response.status + ': Failed to fetch article: ' + error);
  }

  return response.json();
};

export const adminLogin = async (secret: String) => {
  return fetch(BASE_URL + 'admin-login/', {
    method: 'POST',
    body: JSON.stringify({ secret }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// GRAPHQL
export const GET_ARTICLES_NO_CONTENT = gql`
  query {
    allArticles {
      id
      title
      description
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      article {
        id
        title
        content
      }
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      article {
        id
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      article {
        title
      }
    }
  }
`;
