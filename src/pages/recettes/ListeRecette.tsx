import React, { useState, useEffect } from "react";
import useRecette from '../../components/hooks/useRecette'
import { useNavigate } from 'react-router-dom';



const ListeRecette = () => {

    const recettes = useRecette();
    const navigate = useNavigate();

    return (
        <div className="wrapper px-20 bg-gray-50 dark:bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recettes.map((recette) => (
                <div className="recette my-20 mx-10">
                    <img src={recette.strMealThumb} alt={recette.strMeal} className="rounded-lg mx-auto block h-auto w-full lg:w-72 flex-none bg-cover h-24 border-4 border-amber-50"/>
                    <div className="relative px-4 -mt-16">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-baseline">
                                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                                    {recette.strCategory}
                                </span>
                                <div className="ml-2 break-words text-gray-600 uppercase text-xs font-semibold tracking-wider">
                                    {recette.strTags?.replace(/,/g, ", ")}
                                </div>
                            </div>
                            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{recette.strMeal}</h4>
                            <div className="flex items-center justify-between">
                                <div className="mt-1">{recette.strArea}</div>
                                <button className="bg-indigo-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => navigate(`/recette/${recette.idMeal}`)}>
                                    View Recipe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default ListeRecette;
