import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import TopBar from '../home/TopBar';
import { createPost, fetchPosts } from '../redux/postSlice';
import ProfileCard from '../home/ProfileCard';
import { useForm } from 'react-hook-form';
import Loading from '../form/Loading.jsx';
import PostCard from '../home/PostCard.jsx';
import EditProfile from '../home/EditProfile.jsx';
import FollowRequestCard from '../home/FollowRequestCard.jsx';
import FollowerFollowing from '../home/FollowerFollowing.jsx';
import CreatePostForm from '../home/CreatePostForm.jsx';




function Home() {
    const { user, edit } = useSelector((state)=> state.user);
    const { posts,  loading, error } = useSelector((state) => state.posts);
    const { register, handleSubmit,   formState:{errors}} = useForm({mode:"onChange"});

     

    const dispatch = useDispatch();

     // Fetch posts when the component mounts
     useEffect(() => {
      dispatch(fetchPosts()); 
    }, [dispatch]);
    
    
    

   
  return (
    <>
    <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-y-auto' >
      <TopBar/>
      
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full' >
        
        {/* col-1 Profile card and Follower card*/} 
             <div className='w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 '>
                <ProfileCard user={user}/>

                <FollowRequestCard   />
             </div>

        {/* col-2 */}
            <div className='flex-1 h-full min-h-[calc(100vh-2rem)] bg-primary px-4 flex flex-col gap-6 rounded-lg overflow-y-auto' >
                {/* top bar in post card */}

                  <CreatePostForm/>

                  {/* top bar ends here */}


                {/* Postcard */}
              { loading ? (<Loading/>): posts?.length > 0 ? (
                
                  <PostCard  />
                
              ) :(
                  <div className='flex w-full items-center justify-center'>
                  <p className='text-lg text-ascent-2'> No Post Available</p>
                  </div>
              )
              }
            </div>

        {/* col-3 */}
        <div className='hidden w-1/4 h-full lg:flex flex-col gap-8'>
            {/* followRequest */}
            <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>

              <FollowerFollowing/>

            </div>

        </div>
      </div>
    </div>

        { edit && <EditProfile/> }  
    </>
  )
}

export default Home
