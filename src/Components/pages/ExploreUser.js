import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API } from '../global.js';
import { useNavigate } from 'react-router-dom';
import TopBar from '../home/TopBar.jsx';

const ExploreUsers = () => {
  const { userId } = useSelector((state) => state.user.user || {});

 const navigate = useNavigate();
  const [users, setUsers] = useState([]);


  
  useEffect(() => {
    console.log("sender userId:", userId);
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/api/users/explore`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [userId]);

  const handleSendRequest = async (receiverId) => {
    // if (!user || !user.userId) {
    //   console.error('User not authenticated');
    //   return;
    // }
  
    try {
      await axios.post(
        `${API}/api/users/send-follow-request`,
        {
          senderId: userId,
          receiverId,
        },
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
        
        },
        }
      );
  
      setUsers(users.filter((u) => u._id !== receiverId)); // Remove from list after request
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  

  return (
    <div >
    <TopBar/>
    <div className="max-w-7xl bg-bgColor mx-auto p-6 shadow-md ">
    <div className="max-w-4xl bg-primary mx-auto p-6 shadow-md rounded-lg">

          <div className="flex  items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-ascent-1">Explore Users </h2>
            <button
              onClick={() => navigate('/home')}
              className="bg-[#0444a4] text-white px-4 py-2 rounded-full"
            >
              Back
            </button>
          </div>

      {users.length === 0 ? (
        <p className="text-gray-600 text-center">No users to follow</p>
      ) : (
        <ul className="space-y-4 ">
          {users.map((u) => (
            <li
              key={u._id}
              className="flex items-center bg-bgColor justify-between p-4  rounded-lg shadow-sm"
            >
              <div>
                <p className="text-lg text-ascent-1 font-semibold ">
                  {u.firstName} {u.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {u.profession || 'No Profession'}
                </p>
              </div>
              <button
                   onClick={() =>{
                     handleSendRequest(u._id)
                    }
                    }
                    className="px-4 py-2 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Send Request
                  </button>

            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
    </div>
  );
};

export default ExploreUsers;
