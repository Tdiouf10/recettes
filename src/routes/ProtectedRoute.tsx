import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'

const ProtectedRoute = ({ children } : any) => {
    const { user } : any = useContext(AuthContext)
    const location = useLocation()

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} />
    }
    return children
}

export default ProtectedRoute