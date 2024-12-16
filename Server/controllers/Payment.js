const {instance} = require("../config/razorpay")
const Course = require("../models/Course")
const User = require("../models/User")
const crypto = require("crypto")
const CourseProgress = require("../models/CourseProgress")
const { paymentSuccessEmail } = require("../mail//templates/paymentSuccessEmail")
const mailSender = require("../utils/mailSender")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
const { default: mongoose } = require("mongoose");



////////////////////FOR MULTIPLE ITEMS -> Without using webhooks /////////////////
//*************************************************************
//             capture payment and initiate razorpay order --> when you click on buy now
//*************************************************************

exports.capturePayment = async (req, res) => {

    const {course} = req.body
    const userId = req.user.id

    if(course.length === 0){
        return res.json({
            success : false,
            message : "Please provide Course Id"
        })
    }

    let tottalAmount = 0;

    //course Array of category model mein jitna bhi courses hai usspe ek forloop lagao to get each course_id    
    for(const course_id of course){
        let eachCourse ;

        try{
          console.log("TYPE OF COURSEID :- ", typeof(course_id))
          console.log("PRINTING :- ", course_id)

            eachCourse = await Course.findById(course_id)
            if(!eachCourse){
                return res.status(400).json({
                    success : false,
                    message : "Course Not Found"
                })
            }

            //check -> if student is already enrolled or not 
            const uid = new mongoose.Types.ObjectId(userId)
            if(eachCourse.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success : false,
                    message : "Student is already Enrolled"
                })
            }
            //agar already purchase nehi haii toh uss course ki price only fetch hoga 
            tottalAmount += eachCourse.price

        }catch(error){
            console.log(error);
            return res.status(500).json({
                success : false,
                message :error.message
            })            
        }
    }

    //V.V IMP - Creating options 
    const options = {
        amount : tottalAmount * 100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString()
    }

    //Now creating order
    try{
        // Initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)

        res.json({
            success : true,
            message : paymentResponse
        })        

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:  false,
            message : error.message
        })
    }
}

// //*************************************************************
// //    verify signature -payment authorize OR to verify if payment i received or not
// //*************************************************************
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id 
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.course
    const userId = req.user.id

    if(!razorpay_order_id || !razorpay_payment_id 
        || !razorpay_signature || !courses || !userId){
            return res.status(200).json({
                success : false,
                message : "Payment Failed"
            })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id
    
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                .update(body.toString())
                .digest("hex")

    if (expectedSignature === razorpay_signature) {
        //enrolled karwa lo student ko students
        await enrollStudents(courses, userId, res)
        // return res 
        return res.status(200).json({ 
            success: true, 
            message: "Payment Verified" 
        })
    }

    return res.status(400).json({
        success : false,
        message : error.message
    })
}

//******************************************** */
// enroll the student in the courses
//******************************************** */
const enrollStudents = async (courses, userId, res) => {

    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    //jo  students ne course liya haii usmein student ko insert karo 
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          return res
            .status(500)
            .json({ success: false, error: "Course not found" })
        }
        console.log("Updated course: ", enrolledCourse)

        //yahan par course progress initially after payment 0 mark kardo   
        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        })
        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: courseProgress._id,
            },
          },
          { new: true }
        )
  
        console.log("Enrolled student: ", enrolledStudent)

        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail( enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)

      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
}

//***************************************** */
// Send Payment Success Email
//*************************************** */
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }













///////ALL BELOW CODES ARE FOR SINGLE ITEMS //////////////////////

//*************************************************************
//             capture payment and initiate razorpay order --> when you click on buy now
//*************************************************************
// exports.capturePayment = async (req, res) => {
//     try{
//         const {courseId} = req.body
//         const userId = req.user.id
       
//         if(!courseId){
//             return res.status(400).json({
//                 success : false,
//                 message: "Invalid course id"
//             })
//         }

//         let course = await Course.findById(courseId)
//         if(!course){
//             return res.status(400).json({
//                 success : false,
//                 message: "Could not find the course"
//             })
//         }

//         // user already pay for same course 
//         //userid ko jo ki string type mein exist kar rahi thi usse object id mein convert kar die
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success : false,
//                 message: "You have already enrolled for this course"
//             })
//         }
        
//         //order create 
//         const amount = course.price;
//         const currency = "INR";
//         const options = {
//             amount : amount*100,
//             currency : currency,
//             receipt : Math.random(Date.now()).toString(),
//             notes : {
//                 courseId : courseId, //jan buchh kar ye bheja hua haii  
//                 userId : userId
//             }
//         };

//         //function call 
//         try{
//             //initiate using razorpay
//             const paymentResponse = await instance.orders.create(options)
//             console.log("paymentResponse is :- ", paymentResponse)
//             return res.status(200).json({
//                 success : true,
//                 courseName : course.courseName,
//                 courseDescription : course.courseDescription,
//                 thumbnail : course.thumbnail,
//                 orderId : paymentResponse.id,
//                 currency : paymentResponse.currency,
//                 amount : paymentResponse.amount
//             })
//         }catch(error){
//             console.log(error);
//             res.json({
//                 success : false,
//                 message : "Could not initiate order"
//             })
//         }
        
//         return res.status(200).json({
//             success : true,
//             message : "Oder created successfully"
//         })

//     }catch(error){
//         console.log(error)
//         return res.status(500).json({
//             success:false,
//             error : error.message,
//             message : "Something went wrong"
//         })
//     }
// }

// //*************************************************************
// //             verify signature -payment authorize
// //*************************************************************
// exports.verifySignature = async(req, res) => {
//     const webhookSecret = "123456"; //server ki 
//     const signature = req.headers["x-razorpay-signature"] //razorpay ki 

//     //SYNTAX - # process --> //algo and secret key
//     const shasum = crypto.createHmac("sha256", webhookSecret)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest("hex")

//     if(signature === digest){
//         console.log("Payment authorized")
//         //ab course id and user id front end ki req.body se nehi ayegi 
//         //ab ye razorpay se ayegi --> so above need notes 
//         const {courseId, userId}=req.body.payload.payment.entity.notes

//         try{
//             //fulfill the action

//             //find the course and the student enroll in ot 
//             const enrolledCourse = await Course.findOneAndUpdate(
//                                             { _id: courseId },
//                                             {
//                                                 $push : {studentsEnrolled : userId}
//                                             },
//                                             {new : true}
//             );
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success : false,
//                     message : "Course not found"
//                 })
//             }
//             console.log(enrolledCourse)

//             //find the student and add the course to the student's enrolled courses
//             const enrolledStudent = await User.findOneAndUpdate(
//                                                 { _id: userId },
//                                                 {
//                                                     $push : {courses : courseId}
//                                                 }, 
//                                                 {new : true}
//             )
//             console.log(enrolledStudent)

//             //mail send karo confirmation ka 
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulations from StudyNotion",
//                 "Congratulations, you are onboarded into new StudyNotion Course"
//             );
//             return res.status(200).json({
//                 success : true,
//                 mesage : "Signation verified and course added"
//             })

//         }catch(error){
//             return res.status(500).json({
//                 success : false,
//                 mesage : error.message
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success : false,
//             mesage : "Invalid request"
//         })

//     }


// }