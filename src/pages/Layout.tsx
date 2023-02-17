import React, {Fragment, useContext} from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth'
import {auth} from '../firebase'
import {AuthContext} from '../provider/AuthProvider'


const Layout = () => {
    const navigate = useNavigate()
    const {user} : any = useContext(AuthContext)

    const onLogout = async () => {
        await signOut(auth)
            .then(() => {
                localStorage.removeItem('@user')
                navigate('/login')
            })
    }

    return (
        <div>
            <h1> Mes recettes</h1>
            <Link to='/register'>Register</Link>
            <br />
            <Link to='/login'>Login</Link>
            <br />
            <Link to='/recettes'>Recettes</Link>
            {user && (
                <Fragment>
                    <p>Bonjour {user?.email}</p>
                    <button onClick={() => onLogout()}>Logout</button>
                </Fragment>
            )}
            <Outlet/>
        </div>
    )

}

export default Layout