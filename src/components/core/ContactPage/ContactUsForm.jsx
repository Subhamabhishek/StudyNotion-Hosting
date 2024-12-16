import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import { apiConnector } from '../../Services/apiConnector'
// import { contactusEndpoint } from '../../Services/apis'
import countrycode from "../../../data/countrycode.json"
import { apiConnector } from '../../../Services/apiConnector'
import { contactusEndpoint } from '../../../Services/apis'

const ContactUsForm = () => {

  //this loading state variable is different that the loading state variable we use for authentication purposes in authSlice 
  //this is open route -->can still acces even if user is not loggedin 
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState : {errors, isSubmitSuccessful}
  } = useForm()

  //syntax
  const submitContactForm = async(data) => {
    console.log("Logging data ", data)
    try {
      setLoading(true)
      await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect( ()=>{
    if(isSubmitSuccessful){
      reset({
        email : "",
        firstName : "",
        lastName : "",
        message : "",
        phoneNo : ""
      })
    }
    // eslint-disable-next-line
  }, [reset, isSubmitSuccessful])



  return (

    loading ? (<div className='spinner'></div>) 
    : (
      //jab bhi ye form submit hoga toh  ye submitContactForm wala function ko call kardo
      //syntax--> always takes an input
      <form onSubmit={handleSubmit(submitContactForm)}
       className='flex flex-col gap-7'
       >

        <div className='flex flex-col gap-5 lg:flex-row'>

            {/* First Name  */}

            <div className='flex flex-col gap-2 lg:w-[48%]'>
              {/* The value of htmlFor should match the id of the associated input element. */}
              {/* When a user clicks the label, the focus automatically moves to the associated input field. */}
              <label htmlFor='firstName' className='lable-style'>First Name</label>
              <input
                type="text"
                name='firstName'
                id='firstName'
                placeholder='Enter First Name'
                {...register("firstName", {required : true})}
                className='form-style'
              />
              {
                errors.firstName && (
                  <span className='-mt-1 text-yellow-100 text-[12px]'>
                    Please enter your first name
                  </span>
                )
              }

            </div>

            {/* Last Name  */}

            <div className='flex flex-col gap-2 lg:w-[48%]'>

              <label htmlFor='lastName' className='lable-style'>
                Last Name
              </label>

              <input
                type="text"
                name='lastName'
                id='lastName'
                placeholder='Enter Last Name'
                {...register("lastName")}
                className='form-style'
              />
            </div>
        </div>

            {/* Email */}

            <div className='flex flex-col gap-2'>
              <label htmlFor='email' className='lable-style'>Enter Email Address</label>
              <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter your Email'
              {...register("email", {required : true})}
              className='form-style'
              />
              {
                errors.email && (
                  <span className='-mt-1 text-yellow-100 text-[12px]'>
                    Please Enter Your Email Address
                  </span>
                )
              }
            </div>

            {/* Phone number Dropdown */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='phonenumber' className='lable-style'>Phone Number</label>

              <div className='flex gap-5'>
                {/* Dropdown */}
                <div className='flex w-[81px] gap-2 flex-col '>
                  <select
                    name='dropdown'
                    id='dropdown'
                    defaultValue='+91'
                    {...register("countrycode", {required : true})}
                    className='form-style'
                    >
                    {
                      countrycode.map ((code, index)=>{
                        return (                          
                            <option  key={index}                            
                              value={code.code}>

                              {code.code}-{code.country}
                            </option>
                        )})
                    }
                  </select>
                </div>

                <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                  <input type='phonenumber'
                  name='phonenumber'
                  id='phonenumber'
                  placeholder='12345 67890'
                  className='form-style'
                  {...register ("phoneNo", 
                      {
                        required : {value : true, message : "Please Enter Phone Number"},
                        maxLength : {value : 12 , message : "Invalid phoneNumber"},
                        minLength : {value : 10 , message : "Invalid phoneNumber"},
                      })
                  }                  
                  />
                </div>
              </div>

              {
                errors.phoneNo && (
                  <span className='-mt-1 text-yellow-100 text-[12px]'>
                    {errors.phoneNo.message}
                  </span>
                )
              }
            </div>

            {/* message */}

            <div className="flex flex-col gap-2">
              <label htmlFor='message' className='lable-style'>Message</label>
              <textarea
                  name='message'
                  id='message'
                  cols="30"
                  rows="7"
                  placeholder='Enter your message'
                  {...register("message", {required : true})}
                  className='form-style'
              />
              {
                errors.message && (
                  <span className='-mt-1 text-yellow-100 text-[12px]'>
                    Please Enter your Message
                  </span>
                )
              }
            </div>

            <button type='submit'
              disabled = {loading}
              className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${
                  !loading &&
                  "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }  disabled:bg-richblack-500 sm:text-[16px] `}
              >
              Send Message
            </button>

    </form>
    )
    
  )
}

export default ContactUsForm