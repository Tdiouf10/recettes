import React, {useState, useContext} from "react";
import {getAuth, updateEmail, updatePassword} from "firebase/auth";
import {AuthContext} from "../../provider/AuthProvider";
import {useNavigate} from "react-router-dom";

const Profil = () => {

    const [email, setEmail] = useState('')
    const {user}: any = useContext(AuthContext);
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {error, setError}: any = useContext(AuthContext)
    const navigate = useNavigate()

    async function updateEmailForCurrentUser(email: string) {
        const auth = getAuth();
        if (auth.currentUser) {
            updateEmail(auth.currentUser, email).then(() => {
                console.log("Email updated!");
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    async function updatePasswordForCurrentUser(password: string) {
        const auth = getAuth();
        if (auth.currentUser) {
            if (password !== confirmPassword) {
                console.log("Les mots de passe ne correspondent pas");
            } else {
                updatePassword(auth.currentUser, password).then(() => {
                    console.log("Password updated!");
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setError('Les mots de passe ne correspondent pas')
            } else if (error.code === 'auth/email-already-in-use') {
                setError('Cet email est déjà utilisé')
            } else if (error.code === 'auth/invalid-email') {
                setError('Le format de l\'email est invalide')
            } else {
                await updateEmailForCurrentUser(email);
                await updatePasswordForCurrentUser(password);
                navigate('/login');
            }
        } catch (error: any) {
            console.error(error);
        }
    }
    return (
        // Formulaire de modification de l'email et du mot de passe
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md">
                <div>
                    <img className="w-auto h-12 mx-auto"
                         src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                        Modifier votre profil
                    </h2>
                </div>
                {
                    error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                  role="alert">
                        <strong className="font-bold">Erreur !</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                }
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Email
                            </label>
                            <input id="email" name="email" type="email" autoComplete="email" required
                                   placeholder="Email"
                                   className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-gray-400 dark:focus:border-gray-400 sm:text-sm"
                                   value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="space-y-px">
                        <label htmlFor="password"
                               className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Mot de passe
                        </label>
                        <input id="password" name="password" type="password" autoComplete="current-password"
                               placeholder="Mot de passe"
                               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-gray-400 dark:focus:border-gray-400 sm:text-sm"
                               value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password"
                               className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Confirmer le mot de passe
                        </label>
                        <div className="mt-1">
                            <input id="password_confirm" name="password_confirm" type="password" value={confirmPassword}
                                   onChange={e => setConfirmPassword(e.target.value)}
                                   autoComplete="current-password"
                                   placeholder="Confirmer le mot de passe"
                                   className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-gray-400 dark:focus:border-gray-400 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1z"
                                          clipRule="evenodd"/>
                                </svg>
                            </span>
                            Modifier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profil;
