import "../css/friends.css";
import { Friend } from "./friend-comp";
import { getFriends } from "../utils/friendRequests";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function FriendsList({ user, friends, setFriends }) {
	React.useEffect(() => {
		console.log("friendsList-comp.jsx  user: ", user);
		console.log("friendsList-comp.jsx  friends: ", friends);
	}, []);

	const { id } = useParams();

	useEffect(() => {
		if (!id) {
			user = user.username;
		} else {
			user = id;
		}
		getFriends(user).then((data) => {
			console.log("friendsList-comp.jsx getFriends(user) response: ", data);
			setFriends(data);
		});
	}, []);

	return (
		<div id="friendlist">
			<h4>Friends and Family</h4>
			{friends.map((friend) => {
				console.log("friendList-comp.jsx friend from frieds.map :", friend);
				return <Friend key={friend.id} friend={friend} />;
			})}
		</div>
	);
}
