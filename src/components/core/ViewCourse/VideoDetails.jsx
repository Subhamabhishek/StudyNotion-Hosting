import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../Services/operations/courseDetailsAPI'
import { updateCompletedLectures } from '../../../Redux/slices/viewCourseSlice'

import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from 'video-react'
import IconBtn from '../../common/IconBtn'
import Footer from '../../common/Footer'

const VideoDetails = () => {

    //jab ek video component render kia UI par and if want to re-watch and clicking on the button then i am changing DOM component
    //so i need to use useRef() hook

    const {courseId, sectionId, subSectionId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const playerRef = useRef()
    const {token} = useSelector((state) => state.auth)

    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse)

    const [videoData, setVideoData] = useState([])
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [previewSource, setPreviewSource] = useState("")


    useEffect(()=>{

        const setVideoSpecificDetails = async () => {
            if(!courseSectionData.length){
                return;
            }
            if(!courseId && !sectionId && !subSectionId){
                navigate("/dashboard/enrolled-courses")
            }
            else{
                //let's assume ki all 3 are present
                const filteredData = courseSectionData.filter(
                    (course) => course._id === sectionId
                )
                const filteredVideoData = filteredData?.[0].subSection.filter(
                    (data) => data._id === subSectionId
                )

                setVideoData(filteredVideoData[0]);
                setPreviewSource(courseEntireData.thumbnail)
                setVideoEnded(false)
            }
            
        }
        setVideoSpecificDetails()
        // eslint-disable-next-line
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
      
        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
            ].subSection.findIndex((data) => data._id === subSectionId)
    
        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true
        } else {
            return false
        }
    }

    const isLastVideo = () => {

        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
      
        const noOfSubsections = courseSectionData[currentSectionIndex].subSection.length
    
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
        )
      
        if (
        currentSectionIndex === courseSectionData.length - 1 &&
        currentSubSectionIndex === noOfSubsections - 1
        ) {
        return true
        } else {
        return false
        }
        
    }

    const goToNextVideo = () => {
        // console.log(courseSectionData)

        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
  
        const noOfSubsections =
            courseSectionData[currentSectionIndex].subSection.length
    
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )
  
        // console.log("no of subsections", noOfSubsections)
    
        //same section ke andar aur bhi lectures present karte hein
        if (currentSubSectionIndex !== noOfSubsections - 1) {
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id
           //next sub section video par chale jao
            navigate(
            `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            )

        } else {
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
            
            const nextSubSectionId =
                courseSectionData[currentSectionIndex + 1].subSection[0]._id
            //next section ki subction par jao
                navigate(
            `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            )
        }
        
    }

    const goToPrevVideo = () => {
        // console.log(courseSectionData)

        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
    
        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)
    
        if (currentSubSectionIndx !== 0) {
            //same section, prev video
            const prevSubSectionId =
                    courseSectionData[currentSectionIndx].subSection[
                        currentSubSectionIndx - 1
                    ]._id
            //previous section video
            navigate(
            `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            )

        } else {
            //different section , last video
            const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
            const prevSubSectionLength =
                    courseSectionData[currentSectionIndx - 1].subSection.length
            const prevSubSectionId =
                    courseSectionData[currentSectionIndx - 1].subSection[
                        prevSubSectionLength - 1
                    ]._id
            navigate(
            `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            )
        }
        
    }    

    const handleLectureCompletion = async() => {
        setLoading(true)

        const res = await markLectureAsComplete(
                { courseId: courseId, subsectionId: subSectionId },
                token
        )
        if(res) {
            dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-5 text-white">
          <h1 className="mt-4 text-3xl font-semibold underline">{videoData?.title}</h1>

          {!videoData ? (
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          ) : (

            <div className="relative w-full mx-auto overflow-hidden rounded-lg bg-richblack-900">
                <div className='aspect-video'>
                    <Player
                    ref={playerRef}
                    aspectratio="16:9"
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData?.videoUrl}
                    className = "mt-5 p-7 border border-richblack-800 rounded-md"
                    >
                    <BigPlayButton position="center" />

                    {/* Render When Video Ends */}
                    {
                        videoEnded && (
                            <div
                            style={{
                                backgroundImage:
                                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                            }}
                            className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter "
                            >

                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <IconBtn
                                        disabled={loading}
                                        onclick={() => handleLectureCompletion()}
                                        text={!loading ? "Mark As Completed" : "Loading..."}
                                        customClasses="text-xl max-w-max px-4 mx-auto"
                                        />
                                    )
                                }

                                <IconBtn
                                    disabled={loading}
                                    onclick={() => {
                                    if (playerRef?.current) {
                                        // set the current time of the video to 0
                                        playerRef?.current?.seek(0)
                                        setVideoEnded(false)
                                    }
                                    }}
                                    text="Rewatch"
                                    customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                                />

                                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">

                                    {/* //for PREVIOUS AND NEXT VIDEO */}
                                    {
                                        !isFirstVideo() && (
                                        <button
                                            disabled={loading}
                                            onClick={goToPrevVideo}
                                            className="blackButton"
                                        >
                                            Prev
                                        </button>
                                        )
                                    }
                                    
                                    {
                                        !isLastVideo() && (
                                        <button
                                            disabled={loading}
                                            onClick={goToNextVideo}
                                            className="blackButton"
                                        >
                                            Next
                                        </button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    </Player>
                </div>
            </div>

                        
          )}
    
          <p className="pt-2 pb-6 font-medium text-xl">{videoData?.description}</p>

          <Footer/>

        </div>
    )
}

export default VideoDetails