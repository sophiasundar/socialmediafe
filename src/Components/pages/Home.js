import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { followers, requests, suggest, posts } from '../../assets/data.js';
import TopBar from '../home/TopBar';
import ProfileCard from '../home/ProfileCard';
import ProfilePic from '../../assets/ProfilePic.png';
import FollowersCard from '../home/FollowersCard';
import {  updateScrollPosition } from '../redux/scrollSlice.js';
import { Link } from 'react-router-dom';
import CustomButton from '../form/CustomButton.jsx';
import { BsPersonFillAdd } from "react-icons/bs";
import { BiImages } from "react-icons/bi";
import { BiSolidVideo } from "react-icons/bi";
import { BsFiletypeGif } from "react-icons/bs";
import TextInput from '../form/TextInput';
import { useForm } from 'react-hook-form';
import Loading from '../form/Loading.jsx';
import PostCard from '../home/PostCard.jsx';
import EditProfile from '../home/EditProfile.jsx';



function Home() {
    const { user, edit } = useSelector((state)=> state.user);
    const [ followerRequest, setFollowerRequest ] = useState(followers);
    const [ suggestions, setSuggestions ] = useState(suggest)
    const { scrollY, scrollX } = useSelector((state)=> state.scroll);
    const [file, setFile] = useState(null);
    const [posting, setPosting] = useState(false)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit,   formState:{errors}} = useForm({mode:"onChange"});
    const [errMsg,setErrMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
     

    const dispatch = useDispatch();
    
    const handlePostSubmit = async(data)=> {
      
    }

    useEffect(()=>{
        const handleScroll = () => {
          dispatch(updateScrollPosition({scrollY:window.scrollY, scrollX:window.scrollX }));
        };

        window.addEventListener('scroll',handleScroll);

        return () =>{
          window.removeEventListener('scroll',handleScroll);
        }
    },)

  return (
    <>
    <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden' style={{ scrollTop: scrollY, scrollLeft: scrollX }}>
      <TopBar/>
      
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full' >
        
        {/* col-1 */}
             <div className='hidden w-1/3 lg:w:1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
                <ProfileCard user={user}/>
                <FollowersCard followers={user?.followers}/>
             </div>

        {/* col-2 */}
            <div className='flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-lg ' >
               
               <form className='bg-primary px-4 rounded-lg  ' onSubmit={handleSubmit(handlePostSubmit)}>
                   <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
                   <img  className='w-14 h-14 object-cover rounded-full'
                                src={user?.profileUrl ?? ProfilePic}
                                 alt='User Image'
                             />

                         <TextInput name="description" placeholder="What's on your mind..." type='text' 
                        register={register('description',
                              {
                                required: 'Write something about post ',
                              }
                            )}
                            styles='w-full rounded-full py-5'
                            labelStyle='ml-2'
                            error={errors.description ? errors.description.message : ""}
                            />
                             
                   </div>
                   {errMsg?.message && (
                                <span role='alert' className={`text-sm ${
                                  errMsg?.status == 'failed' ? 
                                  "text-[#f64949fe]" 
                                  : "text-[#2ba150fe]"
                                } mt-0.5`}>
                                  {errMsg?.message }
                                </span>
                              )}
                    <div className='flex items-center justify-between py-4'>
                        <label 
                            htmlFor='imgUpload'
                            className='flex items-center gap-1 text-base  text-ascent-2 hover:text-ascent-1 cursor-pointer'
                        >
                          <input className='hidden'
                            type='file'
                            id='imgUpload'
                            data-max-size='5120'
                            accept='.jpg, .png, .jpeg'
                            onChange={(e)=> setFile(e.target.files[0])}
                          />
                            <BiImages />
                            <span>Image</span>
                          
                        </label>

                        <label 
                            htmlFor='videoUpload'
                            className='flex items-center gap-1 text-base  text-ascent-2 hover:text-ascent-1 cursor-pointer'
                        >
                          <input className='hidden'
                            type='file'
                            id='videoUpload'
                            data-max-size='5120'
                            accept='.mp4, .wav'
                            onChange={(e)=> setFile(e.target.files[0])}
                          />
                            <BiSolidVideo />
                            <span>Video</span>
                          
                        </label>
                        
                        <label 
                            htmlFor='vgifUpload'
                            className='flex items-center gap-1 text-base  text-ascent-2 hover:text-ascent-1 cursor-pointer'
                        >
                          <input className='hidden'
                            type='file'
                            id='vgifUpload'
                            data-max-size='5120'
                            accept='.gif'
                            onChange={(e)=> setFile(e.target.files[0])}
                          />
                            <BsFiletypeGif />
                            <span>Gif</span>
                          
                        </label>

                        <div>
                        {posting?(
                          <Loading/>
                        ):(
                          <CustomButton
                            type='submit' title='post' containerStyles= 'bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm'
                          />
                        )}
                        </div>
                    </div>

                 </form>
              { loading ? (<Loading/>): posts?.length > 0 ? (
                posts?.map((post)=>(
                  <PostCard  key={post?._id} post={post} 
                      user={user}
                      deletePost={()=>{}}
                      likePost = {()=>{}}
                  />
                ))
              ) :(
                  <div className='flex w-full items-center justify-center'>
                  <p className='text-lg text-ascent-2'> No Post Available</p>
                  </div>
              )
              }
            </div>

        {/* col-3 */}
        <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
            {/* followRequest */}
            <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
              <div className='flex items-center justify-between text-xl text-ascent-1 border-b border-[#66666645] '>
                  <span>
                     Follow Requests
                  </span>
                  <span>
                    {followerRequest?.length}
                  </span>
              </div>

              <div className='w-full flex flex-col gap-4 pt-4 '>

                  {/* {
                    followerRequest?.map(({_id, requestFrom: from})=>(
                      <div key={_id} className='flex items-center justify-between'>
                           <Link to={'/profile/' + from._id} className='w-full flex gap-4 items-center cursor-pointer'>
                            
                             <img  className='w-10 h-10 object-cover rounded-full'
                                src={from?.profileUrl ?? "NoProfile"}
                                 alt={from?.firstName}
                             />
                           
                           <div className='flex-1'>
                            <p className='text-base font-medium text-ascent-1'>
                                {from?.firstName} {from?.lastName}
                            </p>

                            <span className='text-sm text-ascent-2'>
                            {from?.profession ?? "No Profession"}
                        </span>

                           </div>
                           </Link>
                      </div>
                    ))
                  } */}



                  
                      <div className='flex items-center justify-between'>
                           <Link  className='w-full flex gap-4 items-center cursor-pointer'>
                            
                             <img  className='w-10 h-10 object-cover rounded-full'
                                
                             />
                           
                           <div className='flex-1'>
                            <p className='text-base font-medium text-ascent-1'>
                               
                            </p>

                            <span className='text-sm text-ascent-2'>
                           
                        </span>

                           </div>
                           </Link>

                           <div className='flex gap-1'>
                               <CustomButton
                                title='Accept'
                                containerStyles='bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full'
                               />
                               <CustomButton
                                title='Deny'
                                containerStyles=' border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full'
                               />
                           </div>
                      </div>
                  
              </div>

            </div>

             {/* suggestions */}
             <div className='w-full bg-primary shadow-sm rounded-lg px-5 py-5'>
                <div className='flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]'>
                    <span>Follow Suggestion</span>
                </div>
                 <div className='w-full flex flex-col gap-4 pt-4'>
                    {
                      suggestions?.map((follower)=>(
                        <div className='flex items-center justify-between'
                           key={follower._id} 
                        >
                          <Link className='w-full flex gap-4 items-center cursor-pointer'
                              to={'/profile/'+follower?._id}
                              key={follower?._id} 
                          >
                              <img  className='w-10 h-10 object-cover rounded-full'
                                src={follower?.profileUrl ?? ProfilePic}
                                 alt={follower?.firstName}
                             />

                          <div className='flex-1'>
                            <p className='text-base font-medium text-ascent-1'>
                                {follower?.firstName} {follower?.lastName}
                            </p>

                            <span className='text-sm text-ascent-2'>
                            {follower?.profession ?? "No Profession"}
                        </span>

                           </div>

                          </Link>
                             <div className='flex gap-1'>
                             <button
                                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                                  onClick={() => {}}
                                  >
                                  <BsPersonFillAdd size={20} className='text-[#0f52b6]'/>
                              </button>
                              </div>

                        </div>
                      ))
                    }
                 </div>
             </div>
        </div>
      </div>
    </div>

        { edit && <EditProfile/> }  
    </>
  )
}

export default Home
