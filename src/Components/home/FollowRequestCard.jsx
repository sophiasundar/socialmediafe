//  Follow request card


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProfilePic from '../../assets/ProfilePic.png';
import { API } from '../global.js';

const FollowRequestCard = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const currentUserId = user ? user.userId : null;  // Get userId from the decoded token

  const [requests, setRequests] = useState([]);

  // Fetch follow requests for the current user
  useEffect(() => {
    if (!currentUserId) {
      console.error('Current user ID is not available');
      return; // Prevent fetching if currentUserId is undefined
    }

    const fetchFollowRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API}/api/users/follow-requests/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const followRequests = response.data.followRequests || [];
        // No need to fetch sender details again, because they are already included
        setRequests(followRequests);
      } catch (error) {
        console.error("Error fetching follow requests:", error);
      }
    };

    fetchFollowRequests();
  }, [currentUserId]); // Dependency on currentUserId

  // Handle Accept Request
  const handleAccept = async (requesterId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/api/users/accept-follow`, {
        currentUserId,
        requesterId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update UI after accepting
      setRequests((prev) =>
        prev.filter((request) => request.sender !== requesterId)
      );
    } catch (error) {
      console.error('Error accepting follow request:', error);
    }
  };

  // Handle Deny Request
  const handleDeny = async (requesterId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/api/users/deny-follow`, {
        currentUserId,
        requesterId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update UI after denying
      setRequests((prev) =>
        prev.filter((request) => request.sender !== requesterId)
      );
    } catch (error) {
      console.error('Error denying follow request:', error);
    }
  };

  return (
    <div>
      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]">
          <span>Follow Requests</span>
          <span>{requests?.length}</span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {error && <div className="text-red-500">{error}</div>}

          {/* start */}
          {requests?.map((follower) => (
  <div key={follower?._id} className="w-full flex gap-4 items-center cursor-pointer">
    <Link to={`/profile/${follower?.senderDetails[0]?._id}`} className="flex-1 flex items-center gap-4">
      <img
        src={follower?.senderDetails[0]?.profileUrl ?? ProfilePic}
        alt={follower?.senderDetails[0]?.firstName}
        className="w-10 h-10 object-cover rounded-full"
      />
      <div className="flex-1">
        <p className="text-base font-medium text-ascent-1">
          {follower?.senderDetails[0]?.firstName} {follower?.senderDetails[0]?.lastName}
        </p>
        <span className="text-sm text-ascent-2">
          {follower?.senderDetails[0]?.profession ?? 'No Profession'}
        </span>
      </div>
    </Link>

    {/* Accept & Deny Buttons */}
    <div className="flex gap-2">
      <button
        className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600 "
        onClick={() => handleAccept(follower?.senderDetails[0]?._id)}
      >
        Accept
      </button>
      <button
        className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 "
        onClick={() => handleDeny(follower?.senderDetails[0]?._id)}
      >
        Deny
      </button>
    </div>
  </div>
))}

          {/* end */}
        </div>
      </div>
    </div>
  );
};

export default FollowRequestCard;
