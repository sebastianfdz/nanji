import { duplicates } from './duplicates';
import { postByUser } from '../graphql/queries';
import { API, Storage } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';

export const listUserPosts = async (
  user: string,
  token: string | undefined,
) => {
  const userPosts: GraphQLResult<any> = await API.graphql({
    query: postByUser,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: {
      userID: user,
      limit: 5,
      nextToken: token,
      sortDirection: 'DESC',
    },
  });

  const posts = await Promise.all(
    userPosts.data.postByUser.items.map(async post => {
      const image = await Storage.get(post.image);
      post.s3ImageUrl = image;
      return post;
    }),
  );

  duplicates(userPosts.data.postByUser.items);
  return userPosts;
};

export const listUserPostsTimeline = async (user, token, date) => {
  const userPosts: GraphQLResult<any> = await API.graphql({
    query: postByUser,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: {
      userID: user,
      limit: 5,
      sortDirection: 'DESC',
      date: { le: date },
    },
  });

  const posts = await Promise.all(
    userPosts.data.postByUser.items.map(async post => {
      const image = await Storage.get(post.image);
      post.s3ImageUrl = image;
      return post;
    }),
  );

  duplicates(userPosts.data.postByUser.items);
  return userPosts;
};

export const listAllUserPosts = async (user: string) => {
  const allPostData: GraphQLResult<any> = await API.graphql({
    query: postByUser,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    variables: {
      userID: user,
      sortDirection: 'DESC',
    },
  });
  return allPostData;
};
