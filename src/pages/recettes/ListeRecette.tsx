import React from "react";
import useRecette from '../../components/hooks/useRecette'
import {useNavigate} from 'react-router-dom';


const ListeRecette = () => {

    const recettes = useRecette();
    const navigate = useNavigate();

    return (
        // Afficher la liste des recettes sur des cartes avec tailwind css (https://tailwindcss.com/components/cards)
        <div className="flex flex-wrap justify-center">
            {recettes.map((recette: any) => (
                <div
                    className="w-full max-w-sm mx-2 my-2 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-56" src={recette.strMealThumb} alt={recette.strMeal}/>
                    <div className="p-4">
                        <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">{recette.strMeal}</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {recette.strArea}
                        </p>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700">
                        <button className="text-sm font-medium text-indigo-500 dark:text-indigo-400 hover:underline"
                                onClick={() => navigate(`/recette/${recette.idMeal}`)}>Voir la recette</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListeRecette;
