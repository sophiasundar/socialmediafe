// Topbar navbar

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RiKakaoTalkLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import TextInput from '../form/TextInput';
import CustomButton from '../form/CustomButton';
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { setTheme } from '../redux/theme';
import { Logout } from '../redux/userSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const { register, handleSubmit, formState:{errors}} = useForm({mode:"onChange"});
  const { theme } = useSelector(state=> state.theme);
  const { user } = useSelector(state=> state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
 
    
   const handleLogout = async () => {
      try {
        // Dispatch the logout action (this should update the Redux state)
        dispatch(Logout());
    
        // Wait a bit to allow the Redux state to update
        // This can be adjusted or replaced with a more suitable state monitoring
        setTimeout(() => {
          // Show a success toast after state has updated
          toast.success("You have been logged out successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    
          // Redirect to the login page (or any page you want)
          navigate('/');
        }, 500);  // Adjust the delay based on your needs
    
      } catch (err) {
        // Handle any error that might occur
        toast.error("Logout failed! Please try again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    
  
   const handleTheme = async(data)=>{
      const themeValue = theme === 'light' ? 'dark' : 'light';
      dispatch(setTheme(themeValue));

   }


const handleSearch = async(data)=>{

  
}

  return (
    <div className='topbar w-full flex items-center justify-between py-3  md:py-6 px-4 bg-primary  ' >
           <Link to='/home' className='flex gap-2 items-center '>
           <div className='p-1 md:p-2 bg-[#982286] rounded text-white'>
             <RiKakaoTalkLine />
             </div>
             <span className='text-xl  md:text-2xl  text-[#982286] font-semibold'>
                Talk Pulse
             </span>
           </Link>

           <button
                onClick={() => navigate('/explore-people')}
                className='hidden md:flex bg-[#0444a4] text-white px-4 py-2 rounded-full mr-4'
              >
                Explore People
              </button>

           <form className='hidden md:flex items-center justify-center' onSubmit={handleSubmit(handleSearch)}>

                <TextInput
                placeholder='Search'
                styles='w-[12rem] lg:w-[24rem] rounded-l-full py-2'
                register={register('search')}
              />

            <CustomButton
               title='Search'
               type='submit'
               containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-1 rounded-r-full'
            />

           </form>

           <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'>
              <button onClick={()=> handleTheme()}>{theme === 'light' ? <FaMoon /> : <IoSunnySharp /> }</button>
              <div className='hidden lg:flex'>
              <IoMdNotifications />
              </div>
           </div>

           <CustomButton 
            onClick={handleLogout}
               title='Log Out'
               containerStyles= 'bg-[#0444a4] text-white text-ascent-1 text-sm px-4 md:px-6 py-2 md:py-2 border border-[#666] rounded-full'
           />
            <ToastContainer />
    </div>
  )
}

export default TopBar;
