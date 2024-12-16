import React from 'react'
import Footer from '../components/common/Footer'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { IoCallOutline } from "react-icons/io5";
import ReviewSlider from '../components/common/ReviewSlider';


const sideSection =[
  {
    id:1,
    icon : <HiMiniChatBubbleLeftRight />,
    head : "Chat on us",
    desc1 : "Our friendly team is here to help.",
    desc2 : "@mail address"
  },
  {
    id : 2,
    icon : <LiaGlobeAmericasSolid />,
    head : "Visit us",
    desc1 : "Come and say hello at our office HQ.",
    desc2 : "Here is the location/ address"
  },
  {
    id : 3,
    icon : <IoCallOutline />,
    head : "Call us",
    desc1 : "Mon - Fri From 8am to 5pm",
    desc2 : "+123 456 7890"
  },
  
]

const Contact = () => {
  return (

    <div>
      
      <div className="mx-auto mt-20 flex w-10/12 max-w-maxContent flex-col justify-between gap-16 text-white lg:flex-row sm:place-items-center lg:place-items-start">
        <div className=' border-richblack-700 sm:w-[45%] lg:w-[40%] lg:h-[40%] 
          bg-richblack-800 flex flex-col border rounded-md lg:-ml-10 '>
          {
            sideSection.map((elem, id) => {
              return (
                <div key={id} className='flex p-2'>
                  <div className='text-center text-xl p-5 font-semibold'>
                    {elem.icon}
                  </div>
                  <div className='flex flex-col p-3 pr-7'>
                    <h2 className='font-inter font-semibold text-lg text-richblack-5'>{elem.head}</h2>
                    <p className='text-richblack-200'>{elem.desc1}</p>
                    <p className='text-richblack-200'>{elem.desc2}</p>
                  </div>                  
                </div>
              )
            })
          }          
        </div>

        <div className='lg:w-fit sm:w-[50%] border-[1px] rounded-md border-richblack-700 p-10'>
          <ContactFormSection 
            text = {"Got a Idea? We’ve got the skills. Let’s team up"}
            desc = {"Tall us more about yourself and what you’re got in mind."}
          />
        </div>
        
      </div>

      <section>
        <div className=' relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>

          <h1 className='text-richblack-5 text-center text-4xl font-semibold '>
            Reviews from other learners
          </h1>
          <ReviewSlider/>
        </div>
      </section>

      <Footer/>

    </div>
    
  )
}

export default Contact