import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import TextInput from '../form/TextInput';
import CustomButton from '../form/CustomButton';
import Loading from '../form/Loading';

const PasswordReset =() =>{

  const { register, handleSubmit, formState:{errors}} = useForm({mode:"onChange"});
  const [errMsg,setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const  onSubmit = async(data)=>{
       
  }

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      
          <div className='w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg bg-primary'>
             <p className='text-ascent-1 text-lg font-semibold'>
               Email Address
             </p>

             <span className='text-sm text-ascent-2'>
               Enter email address while Registration
             </span>

             <form action='' onSubmit={handleSubmit(onSubmit)} 
                className='py-4 flex flex-col gap-5'
             >
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
                        title='submit'
                        />
                    }  
             </form>

          </div>

    </div>
  )
};

export default PasswordReset;
