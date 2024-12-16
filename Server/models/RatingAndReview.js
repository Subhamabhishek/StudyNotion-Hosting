const mongoose = require("mongoose")

const ratingAndReviewSchema = new mongoose.Schema({
    
    rating : {
        type : Number,
        required : true,
    },
    review : {
        type : String,
        required : true,
        trim : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "Course",
        index : true
    }
    
});


module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema );