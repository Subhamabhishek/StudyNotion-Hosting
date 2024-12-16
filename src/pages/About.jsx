import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'


const About = () => {
  return (
    <div className='text-white'>

      {/* Section 1 */}
      <section className='bg-richblack-700'>
        <h1 className=' text-center pt-9  text-richblack-100 font-semibold mx-auto'>About Us</h1>
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent gap-10 justify-between text-richblack-5'>
          <header className='flex flex-col text-center py-16 text-4xl font-semibold lg:w-[70%] mx-auto'>
            Driving Innovation in Online Education for a
            <HighlightText text={" Brighter Future"}/>
            
            <p className='text-richblack-300 mt-3 flex flex-col text-center font-medium lg:w-[90%] text-base pb-10'>
              Studynotion is at the forefront of driving innovation in online education. 
              We're passionate about creating a brighter future by offering cutting-edge courses, 
              leveraging emerging technologies, and nurturing a vibrant learning community.
            </p>
          </header>

          <div className="sm:h-[70px] lg:h-[150px]"></div>

          <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3  gap-3 lg:gap-5 '>
            <img src={BannerImage1} alt='bannerImage1'
              className='shadow-[0_0_20px_0] shadow-[#FC6767]'/>
            <img src={BannerImage2} alt='bannerImage2'
             className='shadow-[0_0_20px_0] shadow-[#FC6767]'/>
            <img src={BannerImage3} alt='bannerImage3'
             className='shadow-[0_0_20px_0] shadow-[#FC6767]'/>
          </div>
          
        </div>
      </section>

      {/* Section- 2 */}
      <section className='border-richblack-700 border-b-[1px] pb-36 pt-40 md:pb-48 '>
        <div className='flex flex-col gap-10 mx-auto w-11/12 max-w-maxContent justify-between text-richblack-500 '>
          <div className='h-[100px]'>
            <Quote/>
          </div>
        </div>
      </section>

      {/* Section-3 */}
      <section>

        <div className='flex flex-col mx-auto w-11/12 max-w-maxContent justify-between gap-10 text-richblack-500'>

          {/* Part-1  */}
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">

            <div className='flex flex-col my-24 lg:w-[50%] gap-10'>
              <h1 className='font-inter font-semibold text-4xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent lg:w-[70%]'>Our Founding Story</h1>
              <p className='text-richblack-300 text-base font-medium lg:w-[95%]'>
                Our e-learning platform was born out of a shared vision and 
                passion for transforming education. It all began with a group 
                of educators, technologists, and lifelong learners who recognized 
                the need for accessible, flexible, and high-quality learning 
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the limitations
                and challenges of traditional education systems. We believed that education 
                should not be confined to the walls of a classroom or restricted by geographical 
                boundaries. We envisioned a platform that could bridge these gaps and empower 
                individuals from all walks of life to unlock their full potential.
              </p>
            </div>

            <div >
              <img src={FoundingStory} alt='foundingStoryImg'
                className='shadow-[0_0_20px_0] shadow-[#FC6767]'/>
            </div>

          </div>

          {/* Part-2  */}
          <div className='flex flex-col lg:flex-row lg:gap-10 justify-between'>
            <div className='my-24 flex flex-col lg:w-[40%] gap-10'>
              <h1 className='font-inter font-semibold text-4xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent lg:w-[70%]'>Our Vision</h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an e-learning platform 
                that would revolutionize the way people learn. Our team of dedicated experts worked 
                tirelessly to develop a robust and intuitive platform that combines cutting-edge technology 
                with engaging content, fostering a dynamic and interactive learning experience.
              </p>
            </div>

            <div className='my-10 flex flex-col lg:w-[40%] gap-10'>
              <h1 className="font-inter text-4xl bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-semibold lg:w-[70%]">Our Mission</h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                our mission goes beyond just delivering courses online. We wanted to create a vibrant community 
                of learners, where individuals can connect, collaborate, and learn from one another. We believe 
                that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of 
                collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>

          </div>
        </div>
        
      </section>

      {/* Section-4 */}
      <StatsComponent/>

      {/* Section-5 */}
      <section className='flex flex-col items-center justify-between gap-5 mb-[250px]'>
        <LearningGrid/>
        <div className='lg:mt-44'>
          <ContactFormSection text={"Get in Touch"} desc = {"We’d love to here for you, Please fill out this form."}/>
        </div>
      </section>

      {/* section -6 */}
      <section>
        <div className=' relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>

          <h1 className='text-richblack-5 text-center text-4xl font-semibold '>
            Reviews from other learners
          </h1>
          <ReviewSlider/>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default About