import "./App.css";
import {Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/NavBar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import Error from "./pages/Error";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import MyProfile from "./components/core/Dashboard/MyProfile/MyProfile";
import Setting from "./components/core/Dashboard/Settings/Setting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import {ACCOUNT_TYPE} from "./utils/constants"
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/Instructor/Add Course/AddCourse";
import MyCourse from "./components/core/Dashboard/Instructor/My Course/MyCourse";
import EditCourse from "./components/core/Dashboard/Instructor/My Course/Edit Course/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/Instructor/InstructorDashboard/Instructor";



function App() {

  const { user } = useSelector((state) => state.profile)

  return (

   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

    <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/catalog/:catalogName" element={<Catalog/>} />
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/> 

      <Route path="/courses/:courseId" element={<CourseDetails/>} />

      {/* Open Route - for Only Non Logged in User */}
      <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

      <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
      />

      <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
      />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
      />  

      <Route
            path="update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
      />  


      {/* Private Route - for Only Logged in User */}
      <Route
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
      >

        {/* Outlet  */}
        {/* Route for all users */}

        <Route path="/dashboard/my-profile" element={<MyProfile/>} />
        <Route path="/dashboard/settings" element={<Setting/>} />
        
        {/* PROTECTED ROUTE FOR STUDENT ACCESS ONLY  */}
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
              <Route path="/dashboard/cart" element={<Cart/>} />
            </>
          )
        }

        {/* PROTECTED ROUTE FOR INSTRUCTOR ACCESS ONLY  */}
        {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
            
              <Route path="/dashboard/my-courses" element={<MyCourse/>} />
              <Route path="/dashboard/add-course" element={<AddCourse/>} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              <Route path="/dashboard/instructor" element={<Instructor/>} />

            </>
          )
        }

      </Route>

        {/* // Private Route for View Course page for Students // */}
      <Route element ={ 
        <PrivateRoute>
          <ViewCourse/>
        </PrivateRoute>
      }>

        {/* OUTLET */}

        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />} />
            </>
          )
        }

      </Route>
       

      <Route path="*" element = {<Error/>}/>


    </Routes>

   </div>
  );
}

export default App;
