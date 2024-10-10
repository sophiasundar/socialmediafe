import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import ProfilePic from '../../assets/ProfilePic.png';
import { FaRegEdit } from "react-icons/fa";
import { updateProfile } from '../redux/userSlice';
import { BsBriefcase, BsPersonFillAdd } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import moment from 'moment';

const ProfileCard=({user})=> {
    const { user: data, edit } = useSelector((state)=>state.user);
    const dispatch = useDispatch();


  return (
    <div>
    <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-3 py-4'>
       <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
        <Link to={'/profile/'+user?._id} className='flex gap-2'>
            <img src={user?.profileUrl ?? ProfilePic } alt={user?.email}
               className='w-14 h-14 ml-1 object-cover rounded-full'
            />
            <div className='flex flex-col justify-center'>
                <p className='text-lg font-medium text-ascent-1'>
                      {user?.firstName} {user?.lastName}
                </p>
                <span className='text-ascent-2'>
                    {user?.profession ?? "No Profession"}
                </span>
            </div>
        </Link>

        <div className=''>
             {user?._id === data?._id ? (
              <FaRegEdit 
                 size={22}
                 className='text-blue cursor-pointer'
                 onClick={()=> dispatch(updateProfile(true))}
              />
               ) : (
                <button
                   className='bg-[#0444a430] text-sm text-white p-1 rounded'
                     onClick={() => {}}
                    >
                    <BsPersonFillAdd size={20} className='text-[#0f52b6]'/>
                </button>
               )}
            </div>

        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                  <div className='flex gap-2 items-center text-ascent-2 '>
                  <CiLocationOn className='text-xl text-ascent-1'/>
                    <span>{user?.location ?? "Add Location"}</span>
                </div>

           <div className='flex gap-2 items-center text-ascent-2'>
                 <BsBriefcase className='text-lg text-ascent-1'/>
                 <span>{user?.profession ?? "Add Profession"}</span>
                </div>
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                <p className='text-xl text-ascent-1 font-semibold'>
                     {user?.followers?.length} Followers
                </p>

                <div className='flex items-center justify-between'>
                   <span className='text-ascent-2'>
                      Who viewed your profile
                   </span>
                   <span className='text-ascent-1 text-lg'>{user?.views?.length}</span>
                </div>
                  
                  <span className='text-base text-blue'>
                        {user?.verified ? "verified Account" : "Not Verified"}
                  </span>

              <div className='flex items-center justify-between'>
                <span className='text-ascent-2'>
                  Joined
                </span>
                <span className='text-ascent-2 text-base'>
                  {moment(user?.createdAt?.fromNow()).toString()}
                </span>
              </div>
            </div>
           
    </div>
    </div>
  )
}

export default ProfileCard
