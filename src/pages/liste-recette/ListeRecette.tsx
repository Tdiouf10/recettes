import React, { useState, useEffect } from "react";
import useRecette from '../../components/hooks/useRecette'


const ListeRecette = () => {

    const recettes = useRecette();

    return (
        <div className="wrapper px-20 bg-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recettes.map((recette) => (
                <div className="recette my-20 mx-10">
                    <img src={recette.strMealThumb} alt={recette.strMeal} className="mx-auto block h-auto w-full lg:w-72 flex-none bg-cover h-24"/>
                    <div className="relative px-4 -mt-16  ">
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
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
