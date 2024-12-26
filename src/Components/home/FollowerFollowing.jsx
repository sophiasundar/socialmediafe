import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowersAndFollowing } from "../redux/userSlice";
import FollowersCard from "./FollowersCard";
import FollowingCard from "./FollowingCard";

const FollowersAndFollowingList = () => {
  const dispatch = useDispatch();
  const { followers = [], following = [], loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchFollowersAndFollowing());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-xl text-ascent-1 font-semibold mb-4">Followers</h2>
      {followers.length === 0 ? (
        <p>No followers yet.</p>
      ) : (
        followers.map((follower) => <FollowersCard key={follower.id} follower={follower} />)
      )}
      <h2 className="text-xl text-ascent-1 font-semibold mt-8 mb-4">Following</h2>
      {following.length === 0 ? (
        <p>You're not following anyone yet.</p>
      ) : (
        following.map((followed) => <FollowingCard key={followed.id} following={followed} />)
      )}
    </div>
  );
};

export default FollowersAndFollowingList;
