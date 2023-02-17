import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import {AuthContext} from "../provider/AuthProvider";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {error, setError} : any = useContext(AuthContext)

    const signUp = async (e: any) => {
        e.preventDefault()

        setError(null)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            if (response.user) {
                navigate('/login')
            }
        } catch (error : any) {
            if (error.code === 'auth/email-already-in-use') {
                setError('Cet email est déjà utilisé')
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
            <h1>Register</h1>

            {error && <p style={{color: 'red'}}>{error}</p>}

            <form onSubmit={signUp}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
