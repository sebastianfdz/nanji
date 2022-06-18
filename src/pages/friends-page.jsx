import { Search } from '../components/search-comp';
import { FriendsList } from '../components/friendsList-comp';
import { RequestList } from '../components/requestList-comp';
import '../css/friends.css';
import React, { useState } from 'react';

export function Friends({ user, friends, setFriends }) {
  const [outGoing, setOutGoing] = useState([]);
  const [incoming, setIncoming] = useState([]);

  React.useEffect(() => {
    console.log('@ friends-page.js, User: ', user);
    console.log('@ friends-page.js, friends: ', friends);
    console.log('@ friends-page.js, setFriends: ', setFriends);
  }, []);

  return (
    <>
      <div id="friends">
        <div id="addfriends">
          <Search user={user} outGoing={outGoing} setOutGoing={setOutGoing} />
          <RequestList
            user={user}
            outGoing={outGoing}
            setOutGoing={setOutGoing}
            incoming={incoming}
            setIncoming={setIncoming}
            friends={friends}
            setFriends={setFriends}
          />
        </div>
        <div id="friendspagelist">
          <FriendsList user={user} friends={friends} setFriends={setFriends} />
        </div>
      </div>
    </>
  );
}
