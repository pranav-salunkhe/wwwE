import React from 'react'
import {useCookies} from 'react-cookie';


function UserDashboard() {
    const [cookie, setCookies] = useCookies(["access_token"])
  return (
    <div>UserDashboard
    <a>Logout</a>
    </div>
  )
}

export default UserDashboard