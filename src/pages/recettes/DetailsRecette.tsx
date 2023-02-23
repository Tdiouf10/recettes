import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faList } from "@fortawesome/free-solid-svg-icons";
import ListModale from "../../components/ListModale";

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

    const [favoris, setFavoris] = useState<{ [key: string]: boolean }>({});

    const toggleFavori = (id: string) => {
        setFavoris((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

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

    const { idMeal, strArea, strYoutube, strMeal, strMealThumb, strCategory, strTags, strInstructions } = recette;

    return (
        <div className="w-full p-4 overflow-hidden">
            <div className="flex items-center">
                <div className="flex-1 pr-16">
                    <img className="object-cover rounded w-full h-64 shadow" src={strMealThumb} alt={strMeal}/>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 shadow-md rounded">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">{strMeal}</h3>
                            </div>
                            <div>
                                <button
                                    className="dark:text-white hover:text-red-600 font-bold py-2 px-4 rounded"
                                    onClick={toggleModal}
                                >
                                    <FontAwesomeIcon icon={faList} className="ml-5"/>
                                </button>
                                <ListModale isOpen={showModal} onClose={toggleModal}></ListModale>
                            </div>
                            <div>
                                <button onClick={() => toggleFavori(idMeal)}>
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        color={favoris[idMeal] ? "red" : "white"}
                                        className={favoris[idMeal] ? "heart--active heart-icon" : "heart--inactive heart-icon"}

                                    />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-baseline my-3">
                            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                                {strCategory}
                            </span>
                            <div className="ml-2 break-words text-gray-800 dark:text-white uppercase text-xs font-semibold tracking-wider">
                                {strTags}
                            </div>
                        </div>
                        <div className="ml-2 break-words text-gray-800 dark:text-white font-semibold tracking-wider">
                            Country of origin : {strArea}
                        </div>
                        <h6 className="mx-5 mt-10 break-words text-gray-800 dark:text-white tracking-wider">
                            <a href={strYoutube}>Video : <u>{strYoutube}</u></a>
                        </h6>
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-5 px-5">
                <div className="pr-10 border-r-gray-500 border-r-2">
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
                                    {ingredient} : {measure}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="flex-1 ml-10 break-words">
                    {strInstructions}
                </div>
            </div>
        </div>


        /*<div className="wrapper px-20 bg-gray-50 dark:bg-gray-900">
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
        </div>*/
    );
};

export default DetailsRecette;
