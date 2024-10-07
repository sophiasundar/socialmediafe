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

function Register() {
  const { register, handleSubmit, getValues, formState:{errors}} = useForm({mode:"onChange"});
  const [errMsg,setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
 const dispatch = useDispatch();
    
   const  onSubmit = async(data)=>{
       
   }

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary
      rounded-xl overflow-hidden shadow-xl'>
        {/* col  1 */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col jusitify-center'>
           <div className='w-full flex gap-2 items-center mt-1'> 
             <div className='p-2 bg-[#982286] rounded text-white'>
             <RiKakaoTalkLine />
             </div>
             <span className='text-2xl text-[#982286]'>
                Talk Pulse
             </span>
            
            </div>
            <p className='text-ascent-1 text-base font-semibold'>
            Create An Account</p>
              <form className='py-8 flex flex-col  gap-1 ' onSubmit={handleSubmit(onSubmit)}>

              <div  className='w-full flex flex-col lg:flex-row  md:gap-2'>
              <TextInput name="firstName" placeholder='First Name ' label='First Name' 
                type='text' register={register('firstName',
                  {
                    required: 'FirstName is required'
                  }
                )}
                styles='w-full'
                error={errors.firstName ? errors.firstName?.message : ""}
                />

                <TextInput name="lastName" placeholder='Last Name ' label='Last Name' 
                type='text' register={register('lastName',
                  {
                    required: 'LastName is required'
                  }
                )}
                styles='w-full'
                error={errors.lastName ? errors.lastName?.message : ""}
                />
                </div>

                <TextInput name="email" placeholder='Enter your email ' label='Email Address' 
                type='email' register={register('email',
                  {
                    required: 'Email Address is required'
                  }
                )}
                styles='w-full'
                error={errors.email ? errors.email.message : ""}
                />

               <div  className='w-full flex flex-col lg:flex-row  md:gap-2'>
                <TextInput name="password" placeholder='Enter your password' label='Password' 
                type='password' register={register('password',
                  {
                    required: 'Password is required and Valid!'
                  }
                )}
                styles='w-full'
               error={errors.password ? errors.password.message : ""}
                />

               <TextInput name="password" placeholder='Enter your password ' label='ConfirmPassword' 
                type='password' register={register('cPassword',{
                         validate: (value) =>{
                          const {password} = getValues();
                          if(password != value){
                            return "password do not match";
                          }
                         }},
                )}
                styles='w-full'
               error={errors.cPassword && errors.cPassword.type === "validate"
                ? errors.cPassword?.message : ""
               }
                />
                </div>


                {/* <Link
                   to='/reset-password'
                   className='text-sm text-right text-blue font-semibold '
                >
                    Forgot Password </Link> */}

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
                        title='Sign Up'
                        />
                    }
                     <p className='text-ascent-2 text-sm text-center mb-4'>
                 Already has an account?
                 <Link
                 to='/login'
                 className='text-[#065ad8] font-semibold ml-2  cursor-pointer'
                 >
                     Login
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

export default Register

