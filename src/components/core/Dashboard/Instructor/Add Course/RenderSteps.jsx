import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseForm from './Course Information/CourseForm'
import CourseBuilderForm from "./Course Builder/CourseBuilderForm"
import PublishCourse from "./Publish Course/PublishCourse"
// import CourseInformationForm from "./CourseInformation/CourseInformationForm"
// import PublishCourse from "./PublishCourse"


const steps = [
  {
    id: 1,
    title: "Course Information",
  },
  {
    id: 2,
    title: "Course Builder",
  },
  {
    id: 3,
    title: "Publish",
  },
]

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {
          steps.map((item, index) => (
            <>
              <div
                className="flex flex-col items-center "
                key={item.id}
               >
                <button
                  className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                    step === item.id
                      ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
                 >

                  {/* //agar item wala step --> jo ho chuka hai woh chota haii current step se  */}
                  {step > item.id ? (
                          <FaCheck className="font-bold text-richblack-900" />
                        ) : (
                          item.id
                  )}
                </button>
                
              </div>

              {/* For dashes --> */}
              {/* //item ka id agar steps array ki length se chota hai toh dashed dikhana matlab 2 dashed line dikhega */}
              {
                item.id !== steps.length && (
                  <>
                    <div
                      className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                      step > item.id  ? "border-yellow-50" : "border-richblack-500"
                    } `}
                    ></div>
                  </>
                )
              }

            </>

          ))
        }
      </div>

      {/* TITLE of below STEPS */}
      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item, index) => (
          <div key={index}>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </div>
        ))}
      </div>
      
      {/* Render specific component based on current step */}
      {step === 1 && <CourseForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
