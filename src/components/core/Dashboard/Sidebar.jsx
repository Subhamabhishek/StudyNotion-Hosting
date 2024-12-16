import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../Services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"


export default function Sidebar() {


  const { user, loading: profileLoading } = useSelector( (state) => state.profile )
  const { loading: authLoading } = useSelector((state) => state.auth)
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // to keep track of confirmation modal
  //starting mein mere pass data nehi hai ki uss modal mein kya send hona chahiye data ?
  //so jb bhi modal button click hoga thn woh sara ka sara data jayega --> ConfirmationModal.jsx ke andar as props 
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">

          {
            sidebarLinks.map((tab) => {

                if (tab.type && user?.accountType !== tab.type) return null
                    
                return (
                    <SidebarLink key={tab.id} tab={tab} iconName={tab.icon} />
                )           
            })
          }

        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        
        <div className="flex flex-col">
          <SidebarLink
            tab={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?", 
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>

        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}