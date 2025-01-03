// postcard
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost, likePost, commentOnPost, getComments } from "../redux/postSlice";
import { Link } from "react-router-dom";
import ProfilePic from "../../assets/ProfilePic.png";
import { BiSolidLike, BiLike, BiComment } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import Loading from "../form/Loading";

const PostCard = ({ post, onDelete, onLike}) => {
  const [showAll, setShowAll] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { posts, status, error } = useSelector((state) => state.posts);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const dispatch = useDispatch();

  const handleLikeClick = () => {
    onLike(post._id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    dispatch(
      commentOnPost({
        postId: post._id,
        text: commentText,
      })
    );
    setCommentText(""); // Clear input field after submission
  };

  useEffect(() => {
    if (showComments ) {
      dispatch(getComments(post._id)); // Fetch comments when the section is opened
    }
  }, [dispatch, showComments, post._id]);

  return (
    <div className="mb-2 bg-primary p-3 rounded-xl">
      {/* Post Header */}
      <div className="flex gap-3 items-center mb-2">
        <Link to={`/profile/${post?.userId?._id}`}>
          <img
            className="w-14 h-12 object-cover rounded-full"
            src={post?.userId?.profileUrl ?? ProfilePic}
            alt={post?.userId?.firstName}
          />
        </Link>

        <div className="w-full flex justify-between">
          <div>
            <Link to={`/profile/${post?.userId?._id}`}>
              <p className="font-medium text-lg text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className="text-ascent-2">{post?.userId?.location}</span>
          </div>
          <span className="text-ascent-2">
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div>
        <p className="text-ascent-2">
          {showAll ? post?.description : post?.description.slice(0, 300)}
          {post?.description?.length > 301 && (
            <span
              className="text-blue ml-2 font-medium cursor-pointer"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </span>
          )}
        </p>
        {post?.mediaUrl && post?.mediaType === "video" && (
          <video controls className="w-full mt-2 rounded-lg">
            <source src={post?.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {post?.mediaUrl && post?.mediaType === "image" && (
          <img
            src={post?.mediaUrl}
            alt="post media"
            className="w-full mt-2 rounded-lg"
          />
        )}
      </div>

      {/* Post Actions */}
      <div className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-1 text-base border-t border-[#66666645]">
        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={handleLikeClick}
        >
          {post.likes.includes(user?.userId) ? (
            <BiSolidLike size={20} color="blue" />
          ) : (
            <BiLike size={20} />
          )}
          {post.likes.length} Likes
        </p>

        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          <BiComment size={20} />
          {post?.comments?.length || 0} Comments
        </p>

        {user?.userId === post?.userId?._id && (
          <div
            className="flex gap-1 items-center text-base cursor-pointer"
            onClick={() => onDelete(post?._id)}
          >
            <MdDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>

     {/* Comment Section */}
     {/* {showComments && ( */}
        <div className="mt-3">
          <div>
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                className="flex-1 p-2 border rounded-md"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Comment
              </button>
            </form>

            {/* Comments List */}
            {post.comments?.length > 0 ? (
              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment._id} className="flex gap-3 items-start">
                    <img
                      className="w-10 h-10 object-cover rounded-full"
                      src={comment?.commenter?.profileUrl || ProfilePic}
                      alt={`${comment?.commenter?.firstName} ${comment?.commenter?.lastName}`}
                    />
                    <div className="bg-gray-200 p-3 rounded-lg flex-1">
                      <p className="font-medium">{`${comment?.commenter?.firstName} ${comment?.commenter?.lastName}`}</p>
                      <p className="text-sm text-gray-700">{comment?.commentText}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            )}
          </div>


      </div>
    {/* )}  */}
    </div>
  );
};

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  if (status === "loading") return <Loading />;
  if (status === "failed") return <p>{error?.message || "An error occurred"}</p>;

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={(id) => dispatch(deletePost(id))}
            onLike={(id) => dispatch(likePost(id))}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
