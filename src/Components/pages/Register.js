import React, { useState, useEffect } from 'react';
import { RiKakaoTalkLine } from "react-icons/ri";
import TextInput from '../form/TextInput';
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { registerUser,  clearMessages } from "../redux/userSlice";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CustomButton from '../form/CustomButton';
import Loading from '../form/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
  const { register, handleSubmit, getValues, formState:{errors}} = useForm({mode:"onChange"});
  const [errMsg,setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
 const dispatch = useDispatch();
 const { loading, error, successMessage } = useSelector((state) => state.user);
    
   const  onSubmit = async(data)=>{
    console.log("Submitted Data:", data);

    try{
    dispatch(registerUser(data));

    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
  } catch (err) {
    // Check for specific error
    if (error?.toLowerCase().includes("email already exists")) {
      toast.error("Email already exists. Please use a different one!", {
        position: "top-center",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(error || "Registration failed!", {
        position: "top-center",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
   } }

   useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearMessages());
    }
  
    if (error) {
      const errorMsg = error.toLowerCase().includes("email already exists")
        ? "Email already exists. Please use a different one!"
        : error;
  
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch]);
  

  return (
    <div className='bg-bgColor w-full  flex items-center justify-center p-6 flex-grow overflow-y-auto max-h-full'>
      <div className='w-full md:w-2/3 h-fit lg:h-full  2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary
      rounded-xl overflow-hidden shadow-xl'>
        {/* col  1 */}
        <div className='w-full lg:w-full h-full p-10 2xl:px-20 flex flex-col jusitify-center '>
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
              <form className='py-8 flex flex-col gap-4 flex-grow ' onSubmit={handleSubmit(onSubmit)}>


              {error && <p style={{ color: "red" }}>{error}</p>}
              {successMessage && <p style={{ color: "red" }}>{successMessage}</p>}

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

                <div className='w-full flex flex-col lg:flex-row md:gap-2'>
               
             <TextInput name="location" placeholder='Location ' label='Location' 
                type='text' register={register('location',
                  {
                    required: 'Location is required'
                  }
                )}
                styles='w-full'
                error={errors.location ? errors.location?.message : ""}
                />

             <TextInput name="profession" placeholder='Profession ' label='Profession' 
                type='text' register={register('profession',
                  {
                    required: 'Profession is required'
                  }
                )}
                styles='w-full'
                error={errors.profession ? errors.profession?.message : ""}
                />

                </div>

                <div className='w-full'>

              <TextInput name="profileUrl" placeholder='ProfileUrl' label='ProfileUrl' 
                type='text' register={register('profileUrl',
                  {
                    required: 'ProfileUrl is required'
                  }
                )}
                styles='w-full'
                error={errors.profileUrl ? errors.profileUrl?.message : ""}
                />
              
              </div>

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
                        disabled={loading}
                        containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                        title='Sign Up'
                        >{loading ? "Registering..." : "Sign Up"}</CustomButton>
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

      
      </div>
      <ToastContainer/>
     </div>
  )
}

export default Register

