const express = require("express")
const app = express();

const userRoutes = require("./routes/UserRoutes")
const profileRoutes = require("./routes/ProfileRoutes")
const paymentRoutes = require("./routes/PaymentRoutes")
const courseRoutes = require("./routes/CourseRoutes")
const contactRoutes = require("./routes/ContactRoutes")

require ("dotenv").config()
const database = require("./config/database")
const cookieParser = require("cookie-parser")
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload")

//we want our backend to entertain our frontend also so need to install cors
const cors = require("cors")
const PORT = process.env.PORT || 4000;

database()
app.use(express.json())
app.use(cookieParser())

//vvvimp --> for frontend
app.use(
    cors({
        origin : ["http://localhost:3000","https://study-notion-hosting-seven.vercel.app"],
        credentials : true
    })
)
app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp/",
    })
)
//cloudinary connection
cloudinaryConnect()

//routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/reach", contactRoutes);


app.listen(PORT, ()=>{
    console.log(`APP is Running at ${PORT}`)
})
//default route
app.get("/", (req, res)=>{
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
})