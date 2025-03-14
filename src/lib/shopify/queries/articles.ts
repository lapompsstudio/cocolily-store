export const getArticlesQuery = /* GraphQL */ `
  query getArticlesQuery {
    articles(first: 100) {
      edges {
        node {
          id
          title
          handle
          content
          excerpt
          image {
            src
            originalSrc
            transformedSrc
          }
          tags
          publishedAt
        }
      }
    }
  }
`;

export const getArticleQuery = /* GraphQL */ `
  query getArticle($id: ID!) {
    article(id: $id) {
      title
      publishedAt
      id
      content
      image {
        src
      }
      tags
    }
  }
`;

export const getArticleByHandleQuery = /* GraphQL */ `
  query blogByHandleQuery($blogHandle: String!, $handle: String!) {
    blogByHandle(handle: $blogHandle) {
      articleByHandle(handle: $handle) {
        id
        title
        handle
        content
        contentHtml
        image {
          src
        }
        publishedAt
        tags
      }
    }
  }
`;
