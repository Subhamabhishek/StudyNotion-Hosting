import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo : Logo1,
        Heading : "Leadership",
        Description : "Fully commited to the sucess company"
    },
    {
        Logo : Logo2,
        Heading : "Responsibility",
        Description : "Students will always be our top priority"
    },
    {
        Logo : Logo3,
        Heading : "Flexibility",
        Description : "The ability to switch is an important skills"
    },
    {
        Logo : Logo4,
        Heading : "Solve the problem",
        Description : "Code your way to a solution"
    },
]

const TimeLineSection = () => {
  return (
    <div>

        <div  className='flex flex-row gap-15 items center'>

            {/* Left box --> change some CODE */}
            <div className='w-[45%] flex flex-col gap-5'>
                {
                    timeline.map((elem, index)=>{
                        return(
                            <div className='flex flex-row gap-6' key={index}>
                                
                                <div className='relative w-[50px] h-[50px] bg-richblack-25 flex sm:gap-2 lg:gap-3 items-center justify-center rounded-full lg:mb-2'>
                                    
                                    <img src={elem.Logo} alt='Different logo'/>                                 
                                </div>

                                {
                                    index < timeline.length - 1 && (
                                            <span className='absolute md:h-[35px] lg:h-[20px] lg:translate-y-14 lg:translate-x-6 
                                                border border-dotted border-richblack-100
                                                md:translate-x-5 md:translate-y-14 '></span>                                            
                                    )
                                }

                                <div>
                                    <h2 className='font-semibold text-[18px]'>{elem.Heading}</h2>
                                    <p className='text-base'>{elem.Description}</p>
                                </div>

                            </div>
                        )
                    })
                }

            </div>

            {/* Right Box --> do ellips behid image */}
            <div className='relative shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <img src={timeLineImage} 
                alt='timeLineImage'
                className='rounded-md shadow-white object-cover h-fit'
                />
                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 
                    left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[3px_3px_3px_0px] shadow-caribbeangreen-200/100'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of experience</p>
                    </div>

                    <div className='flex flex-row gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                    </div>
                </div>


            </div>

        </div>
         
    </div>
  )
}

export default TimeLineSection 