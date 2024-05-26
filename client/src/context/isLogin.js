import React from 'react'
import { Navigate } from 'react-router-dom'

export default function IsLogin(props) {
    
    if(localStorage.getItem('token')){
        return props.children
    }else{
        return (
            alert("Please Login First"),
            <Navigate to={'/login'} />
        )
    }
}
