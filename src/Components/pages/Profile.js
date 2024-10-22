import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from'react-router-dom';
import TopBar from '../home/TopBar';
import ProfileCard from '../home/ProfileCard';
import FollowersCard from '../home/FollowersCard';
import Loading from '../form/Loading';
import PostCard from '../home/PostCard';


function Profile() {
      const {id} = useParams();
      const dispatch = useDispatch();
      const { user } = useSelector((state) => state.user);
      const [ userInfo, setUserInfo ] = useState(user);
      const { posts } = useSelector((state) => state.posts);
      const [ loading, setLoading ] = useState(false);
   
      const handleDelete = ()=> {

      }

      const handleLikePost = () => {

      }

  return (
    <>
      <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg'>
          <TopBar/>
        <div className='w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full'>

          {/* col-1 */}
             <div className='hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow'>
                <ProfileCard user={userInfo}/>

                <div className='block lg:hidden'>
                  <FollowersCard followers ={userInfo?.followers}/>
                </div>
             </div>
                   
                
              {/* col-2 */}
              <div className='flex-1 h-full bg-ordinary px-4 flex flex-col gap-6 overflow'>
                     {loading ? (
                      <Loading/>
                     ) : posts?.length > 0 ? (
                      posts?.map((post) => (
                        <PostCard post={post} key={post?._id} user={user} deletePost={handleDelete} likePost={handleLikePost} />
                      ))
                     ): (
                      <div className='flex w-full h-full items-center justify-center'> 
                         <p className='text-lg text-ascent-2'>No Post Available</p>
                      </div>
                     )}
                   </div>   



              {/* col-3 */}
              <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow'>
                  <FollowersCard followers ={userInfo?.followers}/>
              </div>
        </div>
      </div>
    </>
  )
}

export default Profile
