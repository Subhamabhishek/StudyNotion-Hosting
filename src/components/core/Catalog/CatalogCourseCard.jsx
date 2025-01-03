import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'
import GetAvgRating from "../../../utils/avgRating"

const CatalogCourseCard = ({course,Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0)

  //jab bhi course ka data insert hota hai
    useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
    }, [course])
    // console.log("count............", avgReviewCount)

    return (
    <>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                <img
                    src={course?.thumbnail}
                    alt="course thumnail"
                    className={`${Height} w-full rounded-xl object-cover`}
                />
                </div>
                <div className="flex flex-col gap-2 px-1 p-3">
                <p className="text-xl text-richblack-5">{course?.courseName}</p>
                <p className="text-sm text-richblack-50">
                    {course?.instructor?.firstName} {course?.instructor?.lastName}
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-yellow-5">{avgReviewCount || 0}</span>
                
                    <RatingStars Review_Count={avgReviewCount} />
                    <span className="text-richblack-400">
                    {course?.ratingAndReviews?.length} Ratings
                    </span>
                </div>
                <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    </>
    )
}

export default CatalogCourseCard