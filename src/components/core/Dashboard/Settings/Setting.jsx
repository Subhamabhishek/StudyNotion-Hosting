

import ChangePassword from './ChangePassword'
import ChangeProfilePicture from './ChangeProfilePicture'
import DeleteAccount from './DeleteAccount'
import EditProfile from './EditProfile'

const Setting = () => {


 
  return (
    <div>      
        <h1 className='text-richblack-5 mb-14 text-3xl font-medium'>
          Edit Profile
        </h1>

        <ChangeProfilePicture/>
        <EditProfile/>
        <ChangePassword/>
        <DeleteAccount/>

    </div>
  )
}

export default Setting