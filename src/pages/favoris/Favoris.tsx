import useFavoris from "../../components/hooks/useFavoris"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencil} from "@fortawesome/free-solid-svg-icons";
import ListModale from "../../components/ListModale";
import React, {useState} from "react";

const Favoris = (): JSX.Element => {

    const FavorisLists = useFavoris({action:'getAll'})

    if (!FavorisLists) return (<h2>Chargement...</h2>);

    return (
        <div>
            <h1>
                Favoris
            </h1>
            <div className="flex flex-wrap justify-center">
                {Object.keys(FavorisLists).map(favListName => {
                    console.log('favoris',favListName)
                return (
                    <div
                        className="w-full max-w-sm my-10 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div className="flex items-center p-4">
                            <div className="flex-1">
                                <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">{favListName}</h3>
                            </div>
                            <div className="mx-2">
                                <button>
                                    <FontAwesomeIcon
                                        icon={faPencil}
                                        color="green"
                                    />
                                </button>
                            </div>
                            <div className="mx-2">
                                <button>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        color="red"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 dark:text-white p-4">
                            {FavorisLists[favListName].map(recette =>
                                 <div>
                                    {recette.strMeal}
                                 </div>
                            )}
                        </div>
                    </div>
                )})}
            </div>
        </div>
    )
}

export default Favoris