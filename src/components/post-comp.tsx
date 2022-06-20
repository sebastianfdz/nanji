import React from 'react';
import '../css/post.css';
import { TiDeleteOutline } from 'react-icons/ti';
import { useState } from 'react';
import { Storage, API } from 'aws-amplify';
import { deletePost } from '../graphql/mutations';
import { PostProps } from '../Shared/Types';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useEffect } from 'react';
import { DeletePostAPIResponse } from '../Shared/Types';
import { Observable } from '../../node_modules/zen-observable-ts';

const moment = require('moment');

export const Post: React.FC<PostProps> = ({
  currentFriend,
  post,
  posts,
  setPosts,
  setDeleted,
  setAllPosts,
}) => {
  const [style, setStyle] = useState({ display: 'none' });

  async function deleteHandler(selectedID: string) {
    const deleteDetails = {
      id: selectedID,
    };
    const deletedPost = (await API.graphql({
      query: deletePost,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: { input: deleteDetails },
    })) as GraphQLResult<DeletePostAPIResponse>;

    deletedPost.data &&
      (await Storage.remove(deletedPost.data.deletePost.image, {
        level: 'public',
      }));
    setPosts(prev => {
      return prev.filter(data => data.id !== selectedID);
    });
    setAllPosts &&
      setAllPosts(prev => {
        return prev.filter(data => data.id !== selectedID);
      });
    setDeleted(true);
    return deletedPost;
  }

  useEffect(() => console.log(`Post number ${post.id}: `, post), [post]);

  //this if/else is stupid and needs to be fixed

  return (
    <>
      {post.date !== null ? (
        <div className="timeinfo">
          <h3>{moment(post.date).format('MMMM Do YYYY')} - </h3>
          {moment(post.date).format('MMMM Do YYYY') ===
          moment(new Date()).format('MMMM Do YYYY') ? (
            <p>Today</p>
          ) : (
            <p>{moment(post.date).fromNow()}</p>
          )}
        </div>
      ) : null}
      <div
        id={post.id}
        className="post"
        onMouseEnter={e => {
          setStyle({ display: 'block' });
        }}
        onMouseLeave={e => {
          setStyle({ display: 'none' });
        }}>
        {!currentFriend ? (
          <TiDeleteOutline
            style={style}
            onClick={() => deleteHandler(post.id)}
          />
        ) : (
          <></>
        )}
        <img alt={post.id} src={post.s3ImageUrl} />
        <div className="content">
          <div id="contentlocation">
            <h5>{post.location}</h5>
          </div>
          <p>{post.content}</p>
        </div>
      </div>
      <div className="createdat">
        <p>post created: {moment(post.createdAt).format('MMMM Do YYYY')}</p>
      </div>
    </>
  );
};
