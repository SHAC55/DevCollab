import React from 'react'
import { useAuth } from '../context/authContext'

const LogoutButton = () => {
    const{ logout } =  useAuth();

  return (
    <button className='bg-red-500 text-white p-3 rounded-md mt-2 ml-2' onClick={() => logout()}>
        Logout
    </button>
  )
}

export default LogoutButton