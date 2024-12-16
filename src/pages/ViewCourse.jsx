import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { IoMenuSharp } from "react-icons/io5";


import { getFullDetailsOfCourse } from '../Services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, 
    setEntireCourseData, setTotalNoOfLectures } from '../Redux/slices/viewCourseSlice';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';



const ViewCourse = () => {


    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [reviewModal, setReviewModal] = useState(false);


    useEffect(()=>{

        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);

            //AFTER GETTING FULL COURSE DATA WE NEED TO SET THE DATA IN REDUX STORE SO THAT WE DONT NEED TO FETCH THE DATA AGAIN AND AGAIN //
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0 ;
            courseData?.courseDetails?.courseContent?.forEach((section)=>{
                lectures += section.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        }
        setCourseSpecificDetails()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sidebarRef = useRef(null);

    // Toggle Sidebar Visibility
    const toggleSidebar = () => {
        if (sidebarRef.current) {
        sidebarRef.current.classList.toggle("hidden");
        }
    };

  return (
    <>
        {/* FOR SIDEBAR AND FOR VIDEO PLAYBACK BESIDE SIDEBAR  */}
        
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">

            <button
                className='absolute -top-12 z-50 p-2 text-white bg-gray-700 rounded-md lg:hidden text-xl'
                onClick={toggleSidebar}
            >
                <IoMenuSharp fontSize={25}/>
            </button>

            <div  
                ref={sidebarRef}
                className="hidden lg:block min-w-[220px] border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            </div>

            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-6 p-4">
                    <Outlet/>
                </div>
            </div>
        
        </div>

        {/* YE REVIEW MODAL JAB ADD REVIEW BUTTON PAR CLICK HOGA AND woh onClick VideoDetailsSidebar component mein handle ho raha hai  */}
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse