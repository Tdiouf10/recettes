import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {auth, provider} from '../firebase';
import {AuthContext} from "../provider/AuthProvider";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            if (response.user) {
                navigate('/liste-recette')
            }
        } catch (error: any) {
            console.error(error)
        }
    }

    const {error, setError}: any = useContext(AuthContext)

    const signUp = async (e: any) => {
        e.preventDefault()

        setError(null)
        try {
            if (password === confirmPassword) {
                const response = await createUserWithEmailAndPassword(auth, email, password)
                if (response.user) {
                    navigate('/login')
                }
            } else {
                setError('Passwords do not match')
            }
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already in use')
            } else {
                if (error.code === 'auth/invalid-email') {
                    setError('The email format is invalid')
                } else {
                    console.error(error)
                }
            }
        }
    }

    return (

        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
            <div
                className="flex shadow-md">
                <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{width: "30rem", height: "40rem"}}>
                    <div>
                        <img className="w-auto h-12 mx-auto"
                             src="https://svgsilh.com/svg/2400338.svg"/>
                        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                            Create a new account
                        </h2>
                        <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400 max-w">
                            Ou
                            <NavLink to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                {' '}login to your account
                            </NavLink>
                        </p>
                        <div className="mt-6">
                            <button type="button"
                                    onClick={handleGoogleLogin}
                                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M10 3a7 7 0 00-4.9 11.5h.05a5.5 5.5 0 1110.95 0 7 7 0 10-7-7zm0 12a5 5 0 100-10 5 5 0 000 10z"
                                          clipRule="evenodd"/>
                                </svg>
                                Log in with google
                            </button>
                        </div>
                        {
                            error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                          role="alert">
                                <strong className="font-bold">Erreur !</strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        }
                    </div>
                    <div className="mt-8">
                        <div className="mt-6">
                            <form action="#" method="POST" className="space-y-6" onSubmit={signUp}>
                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input id="email" name="email" type="email" value={email}
                                               onChange={e => setEmail(e.target.value)} autoComplete="email" required
                                               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-gray-400 dark:focus:border-gray-400 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input id="password" name="password" type="password" value={password}
                                               onChange={e => setPassword(e.target.value)} autoComplete="current-password"
                                               required
                                               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-gray-400 dark:focus:border-gray-400 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Confirm password
                                    </label>
                                    <div className="mt-1">
                                        <input id="password_confirm" name="password_confirm" type="password"
                                               value={confirmPassword}
                                               onChange={e => setConfirmPassword(e.target.value)}
                                               autoComplete="current-password"
                                               required
                                               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-gray-400 dark:focus:border-gray-400 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit"
                                            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2 bg-cover"
                     style={{width: "24rem", height: "40rem"}}>
                    <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
                         src="https://img.freepik.com/photos-premium/soupe-dans-bol-ceramique-blanche-nouilles-riz-tranches-boeuf-herbes-concept-cuisine-asiatique-vue-laterale-ai-generative_58409-27789.jpg"/>
                </div>
            </div>
        </div>
    )
}

export default Register;
