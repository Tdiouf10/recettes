import React, {useContext, useEffect, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {AuthContext} from "../../provider/AuthProvider";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {NavLink} from "react-router-dom";

const MenuRecette = (): JSX.Element => {

    const navigate = useNavigate()
    const {user}: any = useContext(AuthContext)

    const onLogout = async () => {
        await signOut(auth)
            .then(() => {
                localStorage.removeItem('@user')
                navigate('/login')
            })
    }

    //
    return (
        <header>
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <img className="block lg:hidden h-8 w-auto"
                                     src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                     alt="Workflow"/>
                                <img className="hidden lg:block h-8 w-auto"
                                     src="https://svgsilh.com/svg/2400338.svg"
                                     alt="Workflow"/>
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <NavLink to="/liste-recette"
                                             className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                             style={(window.location.pathname === '/liste-recette') ? {backgroundColor: '#10B981', color: "white"} : {}}
                                    >List of recipes</NavLink>
                                    <NavLink to="/favoris"
                                             className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                style={(window.location.pathname === '/favoris') ? {backgroundColor: '#10B981', color: "white"} : {}}
                                    >Favorites</NavLink>
                                    <NavLink to="/planning"
                                             className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                style={(window.location.pathname === '/planning') ? {backgroundColor: '#10B981', color: "white"} : {}}
                                    >Programs</NavLink>
                                    <NavLink to="/profil"
                                             className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                style={(window.location.pathname === '/profil') ? {backgroundColor: '#10B981', color: "white"} : {}}
                                    >Profile</NavLink>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={onLogout}>Logout
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavLink to="/liste-recette"
                                 className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                                 style={(window.location.pathname === '/liste-recette') ? {backgroundColor: '#10B981'} : {}}
                        >List of recipes</NavLink>
                        <NavLink to="/favoris"
                                 className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                                 style={(window.location.pathname === '/favoris') ? {backgroundColor: '#10B981'} : {}}
                        >Favorites</NavLink>
                        <NavLink to="/planning"
                                 className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                                 style={(window.location.pathname === '/planning') ? {backgroundColor: '#10B981'} : {}}
                        >Programs</NavLink>
                        <NavLink to="/profil"
                                 className="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                                 style={(window.location.pathname === '/profil') ? {backgroundColor: '#10B981'} : {}}
                        >Profile</NavLink>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </header>


    )
}

export default MenuRecette