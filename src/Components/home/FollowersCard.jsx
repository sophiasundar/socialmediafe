import React from "react";


const FollowerCard = ({ follower }) => {
    console.log('Follower:',follower)
  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
      <img
        src={follower.profileUrl }
        alt={`${follower.firstName} ${follower.lastName}`}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p
          
          className="font-semibold text-ascent-1 hover:text-blue-600"
        >
          {follower.firstName} {follower.lastName}
        </p>
        <p className="text-sm text-gray-500">{follower.profession}</p>
        <p className="text-xs text-gray-400">
          Followed on {new Date(follower.followedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default FollowerCard;
