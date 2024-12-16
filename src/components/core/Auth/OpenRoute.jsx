// If token is not present return child and if not present return to dashboard of profile
//agar user login nehi haii means--> token null hai   toh koi bhi yahan jaa sakta hai 

import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } else {
    return <Navigate to="/dashboard/my-profile" />
  }
}

export default OpenRoute