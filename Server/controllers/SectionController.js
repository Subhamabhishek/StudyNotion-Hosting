const Section = require("../models/Section")
const Course = require("../models/Course")
const SubSection = require("../models/SubSection")

///**********************************************************
//                  CREATE NEW SECTION
//**********************************************************
exports.createSection = async(req, res) => {
    try{
        const {sectionName, courseId} = req.body
        if(!sectionName || !courseId){
            return res.status(400).json({
                success : false,
                message : "Please fill all fields"
            })
        }
        const newSection = await Section.create({sectionName})
     
        const updatedCourse = await Course.findByIdAndUpdate(
                                                        courseId,
                                                        {
                                                            $push : {courseContent : newSection._id}
                                                        },
                                                        {new : true}
                                                    ).populate({
                                                        path: "courseContent",
                                                        populate: {
                                                          path: "subSection",
                                                        },
                                                      })
                                                      .exec()
        return res.status(200).json({
            success : true,
            message : "Section created successfully",
            updatedCourse
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Unable to create section",
            error : error.message
        })
    }
}

///***************************************************************************
//                  UPDATE SECTION - when new content is uploaded
//****************************************************************************
exports.updateSection = async(req, res) => {
    try{
        const {sectionName, sectionId, courseId} = req.body
    
        const updatedSection = await Section.findByIdAndUpdate(
                                                    sectionId, 
                                                    {sectionName}, 
                                                    {new : true}
        )
        //section update hua toh konse course mein update hua woh bhi chahiye
        const course = await Course.findById(courseId)
                                        .populate({
                                            path: "courseContent",
                                            populate: {
                                            path: "subSection",
                                            },
                                        })
                                        .exec()
        console.log("course updated :- ", course)

        return res.status(200).json({
            success : true,
            message: updatedSection,      
            data : course
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Unable to update section",
            error : error.message
        })
    }
}

///**********************************************************
//                  DELETE A SECTION
//**********************************************************
exports.deleteSection = async (req, res) => {
    try {
        
      const { sectionId, courseId } = req.body
      
      await Course.findByIdAndUpdate(courseId, {
        $pull: {
          courseContent: sectionId,
        },
      })
      const section = await Section.findById(sectionId)
      console.log(sectionId, courseId)
      if (!section) {
        return res.status(404).json({
          success: false,
          message: "Section not found",
        })
      }
      // Delete the associated subsections
      await SubSection.deleteMany({ _id: { $in: section.subSection } })
  
      await Section.findByIdAndDelete(sectionId)
  
      // find the updated course and return it
      const course = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.status(200).json({
        success: true,
        message: "Section deleted",
        data: course,
      })
    } catch (error) {
      console.error("Error deleting section:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  