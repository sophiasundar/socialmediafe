// profile card 
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { fetchUserProfile,updateProfile } from '../redux/userSlice';
import { BsBriefcase, BsPersonFillAdd } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import EditProfile from './EditProfile';
import moment from 'moment';


const ProfileCard=()=> {
  
  const { user, loading, error } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  
    const dispatch = useDispatch();
     // Count posts for the current user
    const userPostsCount = posts?.filter((post) => post?.userId?._id === user?.userId)?.length || 0;
    const profile = useSelector((state) => state.user.profile);
     
    console.log("Profile ID:", profile?._id);
    console.log("Current User:", user);
    
    console.log("Current User ID:", user?.userId);
    const { isEditingProfile } = useSelector((state) => state.user);

       console.log(isEditingProfile);

       useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          dispatch(fetchUserProfile());
        }
      }, [dispatch]);

    


    const createdAtDate = moment(profile?.createdAt);
    const formattedDateTime = createdAtDate.format('YYYY-MM-DD HH:mm:ss');
      
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {typeof error === 'string' ? error : error?.message || 'Unknown error'}</p>;
  return (
    <div>
    <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-3 py-4'>
       <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
        <Link to={`/profile/${profile?._id}`} className='flex gap-2'>
            <img src={profile?.profileUrl  } alt={`${profile?.firstName} ${profile?.lastName}`} 
               className='w-14 h-14 ml-1 object-cover rounded-full'
            />
            <div className='flex flex-col justify-center'>
                <p className='text-lg font-medium text-ascent-1'>
                      {profile?.firstName} {profile?.lastName}
                </p>
                <span className='text-ascent-2'>
                    {profile?.profession ?? "No Profession"}
                </span>
            </div>
        </Link>


        <div className=''>

                        {profile?._id && user?.userId ? (
                  profile._id === user.userId ? (
                    <FaRegEdit
                      size={22}
                      className="text-blue cursor-pointer"
                      onClick={() => {
                        console.log("Edit button clicked");
                        dispatch(updateProfile(true));
                      }}
                    />
                  ) : (
                    <button
                      className="bg-[#0444a430] text-sm text-white p-1 rounded"
                      onClick={() => {}}
                    >
                      <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                    </button>
                  )
                ) : (
                  <p className="text-red-500">User data not loaded.</p>
                )}

        </div>

                 {/* Conditional Rendering of EditProfile */}
                  {isEditingProfile && <EditProfile />}
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                  <div className='flex gap-2 items-center text-ascent-2 '>
                  <CiLocationOn className='text-xl text-ascent-1'/>
                    <span>{profile?.location ?? "Add Location"}</span>
                </div>

           <div className='flex gap-2 items-center text-ascent-2'>
                 <BsBriefcase className='text-lg text-ascent-1'/>
                 <span>{profile?.profession ?? "Add Profession"}</span>
                </div>
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                <p className='text-xl text-ascent-1 font-semibold'>
                     {profile?.followers?.length} Followers
                </p>

                <p className='text-xl text-ascent-1 font-semibold'>
                     {profile?.following?.length} Following
                </p>

                <div className='flex items-center justify-between'>
                   <span className='text-ascent-2'>
                      Posts
                   </span>
                   <span className='text-ascent-1 text-lg'>{userPostsCount}</span>
                </div>
                  
                 

              <div className='flex items-center justify-between'>
                <span className='text-ascent-2'>
                  Joined
                </span>
                <span className='text-ascent-2 text-base'>
                        {formattedDateTime}

                </span>
              </div>
            </div>
           
    </div>
    </div>
  )
}

export default ProfileCard
