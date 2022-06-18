import { Post } from './post-comp';
import { Alert } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import '../css/postlist.css';

export function PostList({ currentFriend, posts, setPosts, setAllPosts }) {
  React.useEffect(() => {
    console.log('postList-comp.jsx currentFriend: ', currentFriend);
    console.log('postList-comp.jsx posts: ', posts);
  }, []);

  const [deleted, setDeleted] = useState(false);

  function dismissAlert() {
    setDeleted(false);
  }

  return (
    <>
      <div id="postlist" onClick={dismissAlert}>
        {posts.map(post => (
          <Post
            currentFriend={currentFriend}
            post={post}
            posts={posts}
            setPosts={setPosts}
            setAllPosts={setAllPosts}
            setDeleted={setDeleted}
            key={post.id}
          />
        ))}
        {deleted ? (
          <Alert variation="success" isDismissible={true}>
            Post Deleted
          </Alert>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
