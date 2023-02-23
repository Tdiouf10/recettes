import {AuthContext} from "../../provider/AuthProvider";
import React, {useContext} from "react";

const Profil = () => {

    const {user}: any = useContext(AuthContext)

    return (
        // Afficher les informations de l'utilisateur connecté (email) tailwind et mot de passe caché
        <div className="flex flex-col items-center justify-center h-screen">
            <div
                className="flex flex-col items-center justify-center w-full max-w-md p-6 space-y-4 bg-white rounded-md shadow-md">
                <h1 className="text-2xl font-semibold text-gray-700">Profil</h1>
                <p className="text-sm text-gray-500">Email: {user.email}</p>
                <p className="text-sm text-gray-500">Mot de passe: ********</p>
            </div>
        </div>
    );
};

export default Profil;
