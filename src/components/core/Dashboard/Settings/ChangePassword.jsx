import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn'
import { changePassword } from '../../../../Services/operations/settingsAPI'

const ChangePassword = () => {

  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [currentPassword, setCurrentPassword] = useState(false)
  const [newPassword, setNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState : { errors },
  } = useForm()

  const submitPasswordForm = async(data) => {
    console.log("password data : - ", data) 
    try{
      await changePassword(token, data)
    }catch(error){
      console.log("ERROR MESSAGE : - ", error.message)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="currentPassword" className="lable-style">
                Current Password
              </label>
              <input
                type={currentPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter Current Password"
                className="form-style"
                {...register("currentPassword", { required: true })}
              />
              <span
                onClick={() => setCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {currentPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.currentPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>
              <input
                type={newPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {newPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className='bg-richblack-700 text-richblack-5 shadow-[1px_1px_1px_0] shadow-white/50
            text-center text-[17px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200'
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" 
           customClasses={`bg-richblack-700 text-richblack-5 shadow-[1px_1px_1px_0] shadow-white/50
                      text-center text-[17px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200`}/>
        </div>
      </form>
    </>
  )

}

export default ChangePassword