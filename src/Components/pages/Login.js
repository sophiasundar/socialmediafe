import React from 'react';
import { useState } from 'react';
import { RiKakaoTalkLine } from "react-icons/ri";
import TextInput from '../form/TextInput';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CustomButton from '../form/CustomButton';
import Loading from '../form/Loading';
import TalkPulse from '../../assets/TalkPulse.jpg';
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";

function Login() {
  const { register, handleSubmit, formState:{errors}} = useForm({mode:"onChange"});
  const [errMsg,setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
 const dispatch = useDispatch();
    
   const  onSubmit = async(data)=>{
       
   }

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary
      rounded-xl overflow-hidden shadow-xl'>
        {/* col  1 */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col jusitify-center'>
           <div className='w-full flex gap-2 items-center mb-1'> 
             <div className='p-2 bg-[#982286] rounded text-white'>
             <RiKakaoTalkLine />
             </div>
             <span className='text-2xl text-[#982286]'>
                Talk Pulse
             </span>
            </div>
            <p className='text-ascent-1 text-base font-semibold'>
              Log into your account</p>
              
              <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <TextInput name="email" placeholder='Enter your email ' label='Email Address' 
                type='email' register={register('email',
                  {
                    required: 'Email Address is required'
                  }
                )}
                styles='w-full rounded-full'
                labelStyle='ml-2'
                error={errors.email ? errors.email.message : ""}
                />
                <TextInput name="password" placeholder='Enter your passcode ' label='Password' 
                type='password' register={register('password',
                  {
                    required: 'Password is required and Valid!'
                  }
                )}
                styles='w-full rounded-full'
                labelStyle='ml-2'
                error={errors.password ? errors.password.message : ""}
                />

                <Link
                   to='/reset-password'
                   className='text-sm text-right text-blue font-semibold '
                >
                    Forgot Password </Link>

                    {
                      errMsg?.message && (
                        <span className={`text-sm ${
                          errMsg?.status == 'failed' ? "text-[#f64949fe]" : "text-[#2ba150fe]"
                        } mt-0.5`}>
                          {errMsg?.message }
                        </span>
                      )
                    }

                    {
                        isSubmitting ? <Loading/> : <CustomButton
                        type='submit'
                        containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                        title='login'
                        />
                    }
                     <p className='text-ascent-2 text-sm text-center mt-0'>
                 Don't have an account?
                 <Link
                 to='/register'
                 className='text-[#065ad8] font-semibold ml-2  cursor-pointer'
                 >
                     Create Account

                 </Link>
              </p>
              </form>

             
        </div>

        {/* col 2 */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center
           justify-center bg-[#982286]'>
            <div className='relative w-full flex items-center justify-center'>
                  <img
                      src={TalkPulse}
                      alt='Bg Image'
                      className='w-50 2-xl:w-64  h-52  2-xl:h-64 rounded-full object-cover'
                  />
                  <div className='absolute flex gap-1 items-center bg-white right-5 top-1 py-2 px-2 rounded-full '> 
                  <BsShare size={14}/>
                      <span className='text-xs font-medium'>Share</span>
                  </div>

                  <div className='absolute flex gap-1 items-center bg-white left-1 top-1 py-2 px-2 rounded-full '> 
                  <ImConnection size={14}/>
                      <span className='text-xs font-medium'>Connect</span>
                  </div>

                  <div className='absolute flex gap-1 items-center bg-white left-1 bottom-6 py-2 px-2 rounded-full '> 
                  <AiOutlineInteraction size={14}/>
                      <span className='text-xs font-medium'>Interact</span>
                  </div>

            </div>

            

        </div>
      </div>
    </div>
  )
}

export default Login
