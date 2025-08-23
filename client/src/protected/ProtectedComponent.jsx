import React from 'react'
import Loader from './Loader'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedComponent({children,user,authChecked,redirect = '/'}) {
    if(!authChecked)return <Loader></Loader>
    if(!user){
        return <Navigate to ={redirect}/>
    }

    return children? children:<Outlet></Outlet>
}

export default ProtectedComponent