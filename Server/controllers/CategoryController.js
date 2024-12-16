const Category = require("../models/Category")
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
  
//**********************************************************
//                  CREATE CATEGORY
//**********************************************************
exports.createCategory = async(req, res) =>{
    try{
        const {name, description} = req.body

        if(!name){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
        const categoryDetails = await Category.create({
                                    name : name,
                                    description : description
                                })
        console.log("Category Details : ", categoryDetails)

        return res.status(200).json({
            success : true,
            categoryDetails,
            message : "Category details created successfully" 
        })

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

//**********************************************************
//                  GET CATEGORY DETAILS
//**********************************************************
exports.showAllCategory = async(req, res) => {
    try{
        const allCategorys = await Category.find({}, {name : true, description : true})
        return res.status(200).json({
            success : true,
            message : "Category details fetched successfully",
            data : allCategorys 
        })

    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

//************************************************************************************
//                  CATEGORY PAGE DETAILS --- for different category options
//************************************************************************************
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
  
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.course.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "course",
          match: { status: "Published" },
        })
        .exec()
      console.log()
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "course",
          populate : {
            path : "instructor"
          },
          match: { status: "Published" },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.course)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
  
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  