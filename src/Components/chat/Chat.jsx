
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../redux/userSlice';
import TopBar from '../home/TopBar';
import { API } from '../global';

const socket = io(`${API}`);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const messages = useSelector((state) => state.user.messages);
  const followers = useSelector((state) => state.user.followers) || [];
  const following = useSelector((state) => state.user.following) || [];

  const prevSelectedUser = useRef(null);

  useEffect(() => {
    if (selectedUser && currentUser?.user && prevSelectedUser.current !== selectedUser.id) {
      prevSelectedUser.current = selectedUser.id;
      dispatch(fetchMessages({ userId: currentUser.user.userId, otherUserId: selectedUser.id }));
    }
  }, [selectedUser, currentUser, dispatch]);

  const sendMessage = () => {
    if (currentUser?.user && selectedUser) {
      const newMessage = {
        sender: currentUser.user.userId,
        receiver: selectedUser.id,
        message,
        sentAt: new Date(),
      };
      dispatch({ type: 'user/addMessage', payload: newMessage });
      socket.emit('sendMessage', {
        senderId: currentUser.user.userId,
        receiverId: selectedUser.id,
        message,
      });
      setMessage('');
    }
  };

  useEffect(() => {
    if (currentUser?.user) {
      socket.emit('join', currentUser.user.userId);
      socket.on('receiveMessage', (newMessage) => {
        if (
          (newMessage.sender === currentUser.user.userId && newMessage.receiver === selectedUser?.id) ||
          (newMessage.receiver === currentUser.user.userId && newMessage.sender === selectedUser?.id)
        ) {
          dispatch({ type: 'user/addMessage', payload: newMessage });
        }
      });
    }
    return () => {
      socket.off('receiveMessage');
    };
  }, [currentUser, selectedUser, dispatch]);

  return (
    <div className='text-ascent-1 bg-primary'>
      <TopBar />
      <div className="max-w-4xl mx-auto p-4 text-ascent-1 bg-primary">
        <h3 className="text-2xl font-bold text-center mb-4">Chat</h3>

        {/* Messages Section */}
        <div className="border-b pb-4 mb-4">
          <div className="space-y-4">
            {messages.map((msg, index) => {
              if (!currentUser?.user) return null;
              const sender =
                msg.sender === currentUser.user.userId
                  ? 'You'
                  : [...followers, ...following].find((user) => user.id === msg.sender);
              const senderName = sender === 'You' ? sender : sender?.firstName || 'Unknown';
              return (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === currentUser.user.userId ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.sender === currentUser.user.userId ? 'bg-yellow-100 text-black' : 'bg-green-200 text-black'
                    }`}
                  >
                    <span className="font-medium">{senderName}: </span> {msg.message}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User List */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Select a user to chat with:</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h5 className="font-semibold mb-2 ">Followers</h5>
              {followers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="w-full bg-blue-300 text-ascent-1 p-2 rounded-lg hover:bg-gray-300 mb-2"
                >
                  {user.firstName} {user.lastName}
                </button>
              ))}
            </div>
            <div>
              <h5 className="font-semibold mb-2">Following</h5>
              {following.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="w-full bg-blue-300 p-2 rounded-lg hover:bg-gray-300 mb-2"
                >
                  {user.firstName} {user.lastName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 text-ascent-1 bg-primary border border-gray-300 rounded-lg"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
