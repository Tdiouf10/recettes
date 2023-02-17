import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {AuthContext} from "../provider/AuthProvider";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {setUser, error, setError} : any = useContext(AuthContext)

    const signIn = async (e: any) => {
        e.preventDefault()

        setError(null)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            if (response.user) {
                setUser(response.user)
                localStorage.setItem('@user', JSON.stringify(response.user))
                navigate('/home')
            }
        } catch (error : any) {
            if (error.code === 'auth/user-not-found') {
                setError('Votre email ou mot de passse est incorrect')
            } else {
                if (error.code === 'auth/invalid-email') {
                    setError('Le format de l\'email est invalide')
                } else {
                    console.error(error)
                }
            }
        }
    }

    return (
        <div>
            <h1>Login</h1>

            {error && <p style={{color: 'red'}}>{error}</p>}

            <form onSubmit={signIn}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;