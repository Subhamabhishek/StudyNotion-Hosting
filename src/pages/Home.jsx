import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';


const Home = () => {
    return (
      <div>
        {/*Section1  */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
        text-white justify-between'>
  
          <Link to={"/signup"}>
              <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
              transition-all duration-200 hover:scale-95 w-fit shadow-[0_1px_0_0] shadow-white/50'>
                  <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                  transition-all duration-200 group-hover:bg-richblack-900 '>
                      <p>Become an Instructor</p>
                      <FaArrowRight />
                  </div>
              </div>
  
          </Link>
  
          <div className='text-center text-4xl font-semibold mt-7'>
              Empower Your Future with
              <HighlightText text={" Coding Skills"} />
          </div>
  
          <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
              With our online coding courses, you can learn at your own pace, from 
              anywhere in the world, and get access to a wealth of resources, 
              including hands-on projects, quizzes, and personalized feedback from instructors. 
          </div>
  
          <div className='flex flex-row gap-7 mt-8'>
              <CTAButton active={true} linkto={"/signup"}> 
                  Learn More
              </CTAButton>
  
              <CTAButton active={false} linkto={"/login"}> 
                  Book a Demo
              </CTAButton>
          </div>
  
              {/* VIDEO  */}
  
          <div className='mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
              <video
                muted
                loop
                autoPlay
                className="shadow-[5px_5px_rgba(255,255,255)]"
               >
              <source  src={Banner} type="video/mp4" />
              </video>
          </div>
  
          {/* CODE-TypeAnimation SECTION-1 */}
          <div>
              <CodeBlocks 
                  position={"lg:flex-row"}
                  heading={
                      <div className='text-4xl font-semibold'>
                          Unlock Your
                          <HighlightText text={"coding potential"}/>
                          with our online courses
                      </div>
                  }
                  subheading = {
                      "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                  }
                  ctabtn1={
                      {
                          btnText: "Try it Yourself",
                          linkto: "/signup",
                          active: true,
                      }
                  }
                  ctabtn2={
                      {
                          btnText: "Learn More",
                          linkto: "/login",
                          active: false,
                      }
                  }
  
                  codeblock ={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                  }
                  codeColor={"text-yellow-25"}
  
                  backgroundGradient={{
                      width: "385px", 
                      height: "265px", 
                      background: "linear-gradient(#8A2BE2 -6.46%, #FFA500 59.04%, #F8F8FF 124.53%)",
                      transform: "translate(-5%, -40%)",
                      opacity:"20%",  
                      rotate : "-0deg",     
                      borderRadius: "0", // Remove rounded edges
                      filter: "blur(68px)", // Smoothen edges for a faded look
                  }}
              />
          </div>
  
              {/* Code -TypeAnimation Section 2 */}
          <div>
              <CodeBlocks 
                  position={"lg:flex-row-reverse"}
                  heading={
                      <div className='text-4xl font-semibold'>
                          Start
                          <HighlightText text = {" coding in seconds "}/>
                      </div>       
                  }
                  subheading={
                      "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                  }
                  ctabtn1={
                      {
                          btnText : "Continue Lesson",
                          linkto : "/signup",
                          active : true
                      }
                  }
                  ctabtn2={
                      {
                          btnText : "Learn More",
                          linkto : "/login",
                          active : false
                      }
                  }
                  codeblock ={`<<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                  }
                  codeColor={"text-yellow-25"}
                  backgroundGradient={{
                      width: "380px", 
                      height: "265px", 
                      background: "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
                      transform: "translate(-5%, -30%)",
                      opacity:"20%",  
                      rotate : "-0deg",     
                      borderRadius: "0", 
                      filter: "blur(68px)",
                  }}
                  
              />
          </div>
  
          <ExploreMore />
      </div>
  
        {/*Section 2  */}
      <div className='bg-pure-greys-5 text-richblack-700'>
          <div className='homepage_bg h-[310px]'>
  
              <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                  <div className='h-[150px]'></div>
                  <div className='flex flex-row gap-7 text-white '>
                      <CTAButton active={true} linkto={"/signup"}>
                          <div className='flex items-center gap-3' >
                              Explore Full Catalog
                              <FaArrowRight />
                          </div>
                          
                      </CTAButton>
                      <CTAButton active={false} linkto={"/signup"}>
                          <div>
                              Learn more
                          </div>
                      </CTAButton>
                  </div>
  
              </div>
  
          </div>
  
          <div className='mx-auto w-11/12 max-w-maxContent flex flex-col
              intem-center justify-between gap-7'>
                  
                  <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                      <div className='text-4xl font-semibold w-[45%] font-inter'>
                          Get the skills you need for a 
                          <HighlightText text={" Job that is in demand"}/>
                      </div>
  
                      <div className='flex flex-col gap-10 w-[40%] items-start'>
                          <div className='text-[16px] font-inter'>
                              The modern StudyNotion is the dictates its own terms. Today, to be a 
                              competitive specialist requires more than professional skills.
                          </div>
                          <CTAButton active={true} linkto={"/signup"}>
                              <div>
                                  Learn More
                              </div>
                          </CTAButton>
                      </div>
                  </div> 
  
                  <TimeLineSection/>
  
                  <LearningLanguageSection/>    
  
              </div>
  
          </div>
  
          
        {/* Section 3 */}
  
        <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>

            <InstructorSection/>

            {/* Reviews from other Learners */}
            <h2 className='text-center text-4xl font-semibold mt-10'>
                Reivews from Other Learners
            </h2>

            <ReviewSlider/>


        </div>
  
        {/* Footer */}
        <Footer/>
  
      </div>
    )
  }
  
export default Home

