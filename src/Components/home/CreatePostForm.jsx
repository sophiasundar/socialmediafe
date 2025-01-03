import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/postSlice'; 
const CreatePostForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.posts); // Access post status and error from Redux state
  const { user } = useSelector((state) => state.user); // Access user from Redux state

  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isVideo, setIsVideo] = useState(false); // New state to track if the file is a video

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Generate a preview URL
      setIsVideo(selectedFile.type.startsWith('video')); // Check if the file is a video
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !file) {
      alert('Both description and file are required');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('userId', user?.userId); // Include userId from Redux state

    try {
      // Dispatch the createPost thunk action
      await dispatch(createPost(formData));
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg ">
      <h2 className="text-xl font-semibold mb-4 text-center">Create a Post</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error.message}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Write a description..."
          value={description}
          onChange={handleDescriptionChange}
          rows="3"
        />

        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,video/*,image/gif"
          className="mt-4 p-2 bg-gray-100 rounded-md"
        />

        {previewUrl && (
          <div className="mt-4">
            {isVideo ? (
              <video
                src={previewUrl}
                controls
                className="max-w-full h-auto rounded-md"
              />
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-auto rounded-md"
              />
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {status === 'loading' ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;

