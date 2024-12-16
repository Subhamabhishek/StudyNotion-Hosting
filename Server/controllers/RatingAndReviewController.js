const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course")
const { mongo, default: mongoose } = require("mongoose");



//*************************************************************
//                 create Rating
//*************************************************************
exports.createRating = async(req, res) => {
    try{
        
        const userId = req.user.id
        const {rating, review, courseId} = req.body
    
        const courseDetails = await Course.findOne(
                                    {
                                        _id : courseId,
                                        studentsEnrolled : {
                                            $elemMatch : {$eq : userId}
                                            },
                                    }
        )
        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "student is not enrolled in the Course"
            })
        }
        
        const alreadyReviewed = await RatingAndReview.findOne(
                                                {
                                                    user : userId, 
                                                    course : courseId
                                                }
        )
        if(alreadyReviewed) {
            return res.status(403).json({
                success:false,
                message:'Course is already reviewed by the user',
            });
        }
        
        const ratingReviews = await RatingAndReview.create(
                                                        {
                                                            rating, 
                                                            review,
                                                            course : courseId,
                                                            user : userId
                                                        }
        )
    
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id : courseId},
                                        {
                                            $push : {
                                                ratingAndReviews : ratingReviews._id
                                            }
                                        },
                                        {new : true}
        )
        console.log("updatedCourseDetails : ", updatedCourseDetails);
        
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReviews,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//*************************************************************
//                 get Average Rating
//*************************************************************
exports.getAverageRating = async (req, res) => {
    try {
            
        const courseId = req.body.courseId;
        
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null, //jitni bhi entries ayi thi from students, uss sabhi ko ek single group mein wrap kar dia 
                    averageRating: { $avg: "$rating"},
                }
            }
        ])
        console.log("Result : ", result)

        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })

        }    
        //if no rating/Review exist
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//*************************************************************
//                 get All Rating And Reviews
//*************************************************************
exports.getAllRating = async (req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                .sort({rating: "desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email image",
                                })
                                .populate({
                                    path:"course",
                                    select: "courseName",
                                })
                                .exec();
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}