import React from "react";

const FollowingCard = ({ following }) => {
    console.log('Following:',following)

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
      <img
        src={following.profileUrl}
        alt={`${following.firstName} ${following.lastName}`}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p
          
          className="font-semibold text-ascent-1 hover:text-blue-600"
        >
          {following.firstName} {following.lastName}
        </p>
        <p className="text-sm text-gray-500">{following.profession}</p>
        <p className="text-xs text-gray-400">
          Following since {new Date(following.followedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default FollowingCard;
