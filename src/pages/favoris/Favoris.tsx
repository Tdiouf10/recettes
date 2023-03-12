import React, { useContext, useRef, useState } from "react";

import useFavoris from "../../components/hooks/useFavoris"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faDeleteLeft} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import FavorisManager from "../../components/FavorisManager";
import { AuthContext } from "../../provider/AuthProvider";

const Favoris = (): JSX.Element => {

    const [refresh, setRefresh] = useState(false);
    const newList = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const FavorisLists = useFavoris({action:'getAll',refresh:refresh?0:1});
    const {user}: any = useContext(AuthContext);


    if (!FavorisLists) return (<h2>Chargement...</h2>);

    return (
        <div>
            <button type="button"
                    className="mt-5 ml-7 mr-2 dark:text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    style={{background:"#10B981"}}
                    onClick={async () => {
                        newList.current && await FavorisManager.addList(newList.current?.value, user.uid);
                        setRefresh(!refresh);}}>
                Ajouter une liste
            </button>
            <input type='text' id='new-list-name' ref={newList}></input>
            <div className="flex flex-wrap justify-center">
                {Object.keys(FavorisLists).map(favListName => {
                return (
                    <div
                        className="w-full max-w-sm my-10 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                        key={favListName}>
                        <div className="flex items-center p-4">
                            <div className="flex-1">
                                <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">{favListName}</h3>
                            </div>
                            {favListName==='Mes Favoris'? '' :
                            <div className="mx-2">
                                <button className="dark:bg-white dark:px-2 dark:rounded"
                                onClick={async () => {
                                    await FavorisManager.deleteList(favListName, user.uid);
                                    setRefresh(!refresh);
                                }}>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        color="red"
                                    />
                                </button>
                            </div>
                            }
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 dark:text-white p-4">
                            {FavorisLists[favListName].map(recette =>
                                <div className="flex hover:text-black hover:bg-gray-200 hover:px-2 hover:rounded"
                                     key={recette.idMeal}
                                     onClick={() => navigate('/recette/'+recette.idMeal)}>
                                    <div className="flex-1">
                                        {recette.strMeal}
                                    </div>
                                    <div className="text-right">
                                        <button className="delete-btn"
                                            onClick={async (e) => {e.stopPropagation();
                                                             await FavorisManager.updateFavoris(favListName, recette.idMeal, false , user.uid);
                                                             setRefresh(!refresh);}}>
                                            <FontAwesomeIcon icon={faDeleteLeft} color="red" />
                                        </button>
                                    </div>
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