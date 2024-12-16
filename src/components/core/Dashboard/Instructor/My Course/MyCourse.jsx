import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../../../Services/operations/courseDetailsAPI"
import IconBtn from "../../../../common/IconBtn"
import CoursesTable from "./CoursesTable"

//ONLY FOR INSTRUCTOR

const MyCourse = () => {

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goToAddCourse = () =>{
    navigate("/dashboard/add-course")
  }
  
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={goToAddCourse}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {/* Agar courses exist karte hein toh ye table dikhaunga */}
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourse