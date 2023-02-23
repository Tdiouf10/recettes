import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";

interface Recette {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
    strTags: string;
    strArea: string;
    strYoutube: string;
}

const DetailsRecette = () => {
    const { id } = useParams();
    const [recette, setRecette] = useState(null);

    useEffect(() => {
        const fetchRecette = async () => {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            setRecette(data.meals[0]);
        };

        fetchRecette();
    }, [id]);

    if (!recette) {
        return <div>Loading...</div>;
    }

    const { strMeal, strMealThumb, strCategory, strTags, strArea, strInstructions, strYoutube } = recette;

    return (
        <div className="wrapper px-20 bg-gray-50 dark:bg-gray-900">
            <div className="grid grid-cols-12">
                <div className="recette my-20 mx-10 col-span-12">
                    <img src={strMealThumb} alt={strMeal} className="rounded-lg mx-auto block h-auto w-full lg:w-96 flex-none bg-cover h-24 border-4 border-amber-50"/>
                    <div className="relative px-4 -mt-16">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-baseline">
                                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                                    {strCategory}
                                </span>
                                <div className="ml-2 break-words text-gray-600 uppercase text-xs font-semibold tracking-wider">
                                    {strTags}
                                </div>
                            </div>
                            <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{strMeal}</h4>
                            <div className="flex items-center justify-between">
                                <div className="mt-1">{strArea}</div>
                            </div>
                            <h6 className="m-5"><a href={strYoutube}><u>{strYoutube}</u></a></h6>
                            <div className="p-8 grid grid-cols-12">
                                <div className="col-span-4">
                                    <h3 className="mt-1 mb-5 text-xl font-semibold leading-tight truncate">Ingredients : </h3>
                                    <ul>
                                        {[...Array(20)].map((_, i) => {
                                            const ingredient = recette[`strIngredient${i + 1}` as keyof Recette];
                                            const measure = recette[`strMeasure${i + 1}` as keyof Recette];
                                            if (!ingredient) {
                                                return null;
                                            }
                                            return (
                                                <li key={i}>
                                                    {ingredient} - {measure}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="ml-2 col-span-8 break-words">
                                    {strInstructions}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsRecette;
