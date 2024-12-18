import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { MdClose } from "react-icons/md";
import TextInput from '../form/TextInput';
import Loading from '../form/Loading';
import CustomButton from '../form/CustomButton';
import { updateUserProfile, updateProfile, fetchUserProfile } from '../redux/userSlice.js';

const EditProfile=() =>{
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onChange",
    defaultValues: { ...user }, // Ensure form is initialized with user data
  });

   // UseEffect to watch for changes in user and reset form if needed
   useEffect(() => {
    // Reset form values to match user data if user data is updated
    if (user) {
      reset({ ...user });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    if (!user) {
      setErrMsg("User not found!");
      return;
    }

    setIsSubmitting(true);
    const formData = { ...data, userId: user.userId };

    if (picture) {
      formData.picture = picture;
    }

    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      await dispatch(fetchUserProfile());
      setErrMsg({ message: "Profile updated successfully!", status: "success" });
      // Optionally reset the form with updated data after successful submission 
      reset({ ...formData });
    } catch (error) {
      setErrMsg({ message: error || "Failed to update profile", status: "failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(updateProfile(false)); // Close the modal
  };

  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    
        <div className='fixed z-50 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-[#000] opacity-100'>
                   <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>

                   </span>
                    <div className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                       role='dialog'
                       aria-modal = 'true'
                       aria-labelledby='modal-headline'
                    >
                        <div className='flex justify-between px-6 pt-5 pb-2'>
                              <label
                                  htmlFor = 'name'
                                  className='block font-medium text-xl text-ascent-1 text-left'
                              >
                                Edit Profile
                              </label>
                              <button className='text-ascent-1' onClick={handleClose}>
                                <MdClose size={22}/>
                              </button>
                        </div>
                         <form className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6'
                                  onSubmit={handleSubmit(onSubmit)}
                         >
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

                                <TextInput name="profession" placeholder='profession ' label='Profession' 
                                type='text' register={register('profession',
                                {
                                    required: 'Profession is required'
                                }
                                )}
                                styles='w-full'
                                error={errors.profession ? errors.profession?.message : ""}
                                />

                                <TextInput name="location" placeholder='Location ' label='Location' 
                                type='text' register={register('location',
                                {
                                    required: 'Location is required'
                                }
                                )}
                                styles='w-full'
                                error={errors.location ? errors.location?.message : ""}
                                />
                               
                               <label className='flex items-center gap-1 text-base text-ascent-2 hover:text=ascent-1 cursor-pointer my-4'
                               >  
                                <input className=''
                                  type='file'
                                  id='imgUpload'
                                  onChange={(e) => handleSelect(e)}
                                  accept='.jpg, .png, .jpeg'
                                />
                               </label>

                               {
                                errMsg?.message && (
                                    <span role='alert' className={`text-sm ${
                                    errMsg?.status == 'failed' ? "text-[#f64949fe]" : "text-[#2ba150fe]"
                                    } mt-0.5`}>
                                    {errMsg?.message }
                                    </span>
                                )
                                }

                                <div className='py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]'>
                                      {isSubmitting ? (
                                         <Loading/>
                                      ):(
                                        <CustomButton
                                            type='submit'
                                            containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                                            title = 'submit'
                                        />
                                      )}
                                </div>
                         </form>
                    </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default EditProfile