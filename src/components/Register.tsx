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
            if(password === confirmPassword) {
                const response = await createUserWithEmailAndPassword(auth, email, password)
                if (response.user) {
                    navigate('/login')
                }
            } else {
                setError('Les mots de passe ne correspondent pas')
            }
        } catch (error: any) {
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

        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md">
                {
                    error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                  role="alert">
                        <strong className="font-bold">Erreur !</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                }
                <div>
                    <img className="w-auto h-12 mx-auto"
                         src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                        Créer un compte
                    </h2>
                    <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400 max-w">
                        Ou
                        <NavLink to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            {' '}se connecter à votre compte
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
                            Se connecter avec Google
                        </button>
                    </div>
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
                                    Mot de passe
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
                                    Confirmer le mot de passe
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


                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox"
                                           className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-gray-400"/>
                                    <label htmlFor="remember_me"
                                           className="block ml-2 text-sm text-gray-900 dark:text-gray-200">
                                        Se souvenir de moi
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#"
                                       className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-gray-200">
                                        Mot de passe oublié ?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    S'inscrire
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
