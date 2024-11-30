import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectRoute = ({ children }) => {
    
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null || user.role !== "admin") {
            navigate("/auth")
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectRoute
