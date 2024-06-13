// protection for container 

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const [loading, setLoading] = useState()
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)
    useEffect(() => {

        if(authentication && authStatus !== authentication) {
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
  return loading ? <h1>Loading...</h1> : <>{children}</>
}


