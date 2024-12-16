import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BsChevronDown } from "react-icons/bs"
import { IoMdArrowRoundBack } from "react-icons/io";

import IconBtn from '../../common/IconBtn'



const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")

    const navigate = useNavigate()
    const location = useLocation()
    const {sectionId, subSectionId} = useParams()

    const {
        courseSectionData, courseEntireData, 
        completedLectures, totalNoOfLectures
    } = useSelector((state)=> state.viewCourse);

    // FOR SECTION ROTATION // 
    const sectionRefs = useRef({});


    useEffect(() => {
        ;(()=>{
            if(!courseSectionData.length){
                return;
            }
            //current section ki Id kya hai ?
            const currentSectionIndex = courseSectionData.findIndex( 
                (data) => data._id === sectionId
            )
            //current Sub Section ki Id kya hai ?
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            //current video lonsa chalraha hai ?
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            //set Current Section here 
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set Current subSection here
            setVideoBarActive(activeSubSectionId);
        })()
        //jab bhi nichhe ki koi bhi dependency change hota hai thn tum activeStatus ko chnage kar dena ,---> so dependency used 
        // eslint-disable-next-line
    }, [courseSectionData, courseEntireData, location.pathname])


    // Function to toggle section visibility and rotation
    const handleSectionToggle = (sectionId) => {
        if (sectionRefs.current[sectionId]) {
            sectionRefs.current[sectionId] = !sectionRefs.current[sectionId];
        } else {
            sectionRefs.current[sectionId] = true;
        }
        setActiveStatus((prev) => (prev === sectionId ? "" : sectionId));
    };

    

   return (
    <>
        <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">

            {/* FOR HEADINGS AND BUTTONS  */}
            <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                {/* FOR BUTTON */}
                <div className="flex w-full items-center justify-between ">
                    <div 
                        className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                        title="back"
                        onClick={() => navigate("/dashboard/enrolled-courses")}>

                        <IoMdArrowRoundBack size={30} />
                    </div>

                    <div>
                        <IconBtn
                            text = "Add Review"
                            customClasses="ml-auto"
                            onclick = {()=> setReviewModal(true)}
                        />

                    </div>
                </div>

                {/* FOR HEADING OR TITLE */}
                <div  className="flex flex-col">
                    <p>{courseEntireData?.courseName}</p>
                    <p className="text-sm font-semibold text-richblack-500">
                        {completedLectures?.length} / {totalNoOfLectures}
                    </p>                     
                </div>
            </div>

            {/* FOR sections and subsections  */}
            <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                {
                    courseSectionData.map((section, index) => (
                        //ye TO LEVEL div ko tap karne se sirf ek section hi khulega woh video wala highlight nehi hoga 
                        <div
                            className="mt-2 cursor-pointer text-sm text-richblack-5"
                            onClick = {() => handleSectionToggle(section?._id)}
                            key = {index}
                         >
                            {/* SECTION */}
                            <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                                <div className="w-[70%] font-semibold">
                                    {section?.sectionName}
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-[12px] font-medium">
                                        Lession {section?.subSection.length}
                                    </span>
                                    <span
                                        className={`${
                                            sectionRefs.current[section?._id]
                                            ? "rotate-0"
                                            : "rotate-180"
                                        } transition-all duration-500`}
                                    >
                                        <BsChevronDown />
                                    </span>
                                </div>                               
                            </div>

                            {/* Sub-Sections */}
                            <div>
                                {
                                    activeStatus === section?._id && (
                                        <div className="transition-[height] duration-500 ease-in-out">
                                            {
                                                section.subSection.map((topic, index) => (
                                                    <div key={index}
                                                        className={`flex gap-3  px-5 py-2 ${
                                                            videoBarActive === topic._id
                                                            ? "bg-yellow-200 font-semibold text-richblack-800"
                                                            : "hover:bg-richblack-900"
                                                        } `}    
                                                        onClick={()=>{
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic._id}`)
                                                            setVideoBarActive(topic?._id)
                                                        }}
                                                     >
                                                        <input
                                                            type='checkbox'
                                                            checked = {completedLectures.includes(topic?._id)}
                                                            onChange={() => {}}
                                                         />
                                                        <span>{topic.title}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>

    </>
  )
}

export default VideoDetailsSidebar