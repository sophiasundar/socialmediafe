import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, createPost } from '../redux/postSlice';
import { Link } from 'react-router-dom';
import ProfilePic from '../../assets/ProfilePic.png';
import { BiSolidLike, BiLike, BiComment } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import moment from 'moment';
import Loading from '../form/Loading';
// import CustomButton from '../form/CustomButton';

const PostCard = ({ posts, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(false);
  const [showComments, setShowComments] = useState(false);

  console.log(posts); // Debugging: Check post data in console

  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      {/* Post Header */}
      <div className="flex gap-3 items-center mb-2">
        <Link to={`/profile/${posts?.userId?._id}`}>
          <img
            className="w-14 h-14 object-cover rounded-full"
            src={posts?.userId?.profileUrl ?? ProfilePic}
            alt={posts?.userId?.firstName}
          />
        </Link>

        <div className="w-full flex justify-between">
          <div>
            <Link to={`/profile/${posts?.userId?._id}`}>
              <p className="font-medium text-lg text-ascent-1">
                {posts?.userId?.firstName} {posts?.userId?.lastName}
              </p>
            </Link>
            <span className="text-ascent-2">{posts?.userId?.location}</span>
          </div>
          <span className="text-ascent-2">
            {moment(posts?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div>
        <p className="text-ascent-2">
          {showAll ? posts?.description : posts?.description.slice(0, 300)}
          {posts?.description?.length > 301 && (
            <span
              className="text-blue ml-2 font-medium cursor-pointer"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </span>
          )}
        </p>
        {posts?.mediaUrl && posts?.mediaType === "video" && (
          <video controls className="w-full mt-2 rounded-lg">
            <source src={posts?.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {posts?.mediaUrl && posts?.mediaType === "image" && (
          <img
            src={posts?.mediaUrl}
            alt="post media"
            className="w-full mt-2 rounded-lg"
          />
        )}
         {posts?.mediaUrl && posts?.mediaType === "gif" && (
          <img
            src={posts?.mediaUrl}
            alt="post media"
            className="w-full mt-2 rounded-lg"
          />
        )}
      </div>

      {/* Post Actions */}
      <div className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-1 text-base border-t border-[#66666645]">
        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => likePost(posts?._id)}
        >
          {posts?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} color="blue" />
          ) : (
            <BiLike size={20} />
          )}
          {posts?.likes?.length} Likes
        </p>

        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          <BiComment size={20} />
          {posts?.comments?.length} Comments
        </p>

        {user?._id === posts?.userId?._id && (
          <div
            className="flex gap-1 items-center text-base cursor-pointer"
            onClick={() => deletePost(posts?._id)}
          >
            <MdDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>

      {/* Post Comments */}
      {showComments && (
        <div className="mt-4">
          <p className="text-sm text-ascent-2">Comments feature coming soon!</p>
        </div>
      )}
    </div>
  );
};


const PostList = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user); // Assuming user data is stored in user slice

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);
  

    // Debugging
    // useEffect(() => {
    //   console.log('Posts:', posts);
    //   console.log('Status:', status);
    //   console.log('Error:', error);
    // }, [posts, status, error])

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            posts={post}
            user={user}
            deletePost={(id) => console.log(`Delete post: ${id}`)}
            likePost={(id) => console.log(`Like post: ${id}`)}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
