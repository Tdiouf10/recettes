import {useContext, useEffect, useState} from "react";
import ListModale from "../../components/ListModale";
import PlanningModale from "../../components/PlanningModale";
import useRecette from '../../components/hooks/useRecette'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faClock } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../../provider/AuthProvider";
import FavorisManager from "../../components/FavorisManager";
import useFavoris from "../../components/hooks/useFavoris";


const ListeRecette = () => {

    const {user}: any = useContext(AuthContext)
    const navigate = useNavigate();

    const [selectedRecette, setSelectedRecette] = useState<number>(-1);
    const [favoris, setFavoris] = useState<{ [key: number]: boolean }>({});
    
    const Favoris = useFavoris({action:'getNamesAndIds',refresh:selectedRecette});
    const recettes = useRecette();
    const recetteIds =  Favoris && Object.assign({}, ...(Favoris["Mes Favoris"].map(r => {return {[r.idMeal]: true}})));
    const [searchQuery, setSearchQuery] = useState("");

    const toggleFavori = (id: number) => {  
        setFavoris((prevState) => ({ ...prevState, [id]: !prevState[id] }));
        FavorisManager.updateFavoris('Mes Favoris', id, !favoris[id] , user.uid);
    };

    useEffect(() => {
        Favoris && setFavoris(recetteIds)
    },[Favoris])

    const [showModal, setShowModal] = useState(false);
    const [showPlanningModal, setShowPlanningModal] = useState(false);

    const toggleModal = (recetteId:number) => {
        setSelectedRecette(recetteId)
        setShowModal(!showModal);
    };

    const togglePlanningModal = () => {
        setShowPlanningModal(!showPlanningModal);
    };

    const filteredRecettes = recettes.filter((recette: any) =>
        recette.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recette.strCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recette.strTags?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-10">
            <form className="navbar-form text-center" action="" autoComplete="off">
                <div className="input-group">
                    <input type="text" name="s" className="form-control p-2 border-b-2 border-b-gray-500 rounded"
                           autoComplete="off"
                           placeholder="Search for a Meal..." value={searchQuery}
                           onChange={(event) => setSearchQuery(event.target.value)}/>
                    <div className="input-group-btn">
                        <button type="submit" className="btn btn-default"><span
                            className="glyphicon glyphicon-search"></span></button>
                    </div>
                </div>
            </form>
            <div className="flex flex-wrap justify-center">
                {filteredRecettes.map(recette => (
                    <div key={recette.idMeal}
                        className="w-full max-w-sm my-10 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <img className="object-cover w-full h-56" src={recette.strMealThumb} alt={recette.strMeal}/>
                        <div className="p-4">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">{recette.strMeal}</h3>
                                </div>
                                <div>
                                    <button onClick={() => toggleFavori(recette.idMeal)}>
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            color={favoris[recette.idMeal] ? "red" : "#BFC9CA"}
                                            className={favoris[recette.idMeal] ? "heart--active heart-icon" : "heart--inactive heart-icon"}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-baseline my-3">
                                <span
                                    className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                                    {recette.strCategory}
                                </span>
                                <div
                                    className="ml-2 break-words text-gray-800 dark:text-white uppercase text-xs font-semibold tracking-wider">
                                    {recette.strTags}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-4">
                            <div className="flex-1">
                                <button
                                    className="bg-gray-100 dark:bg-white hover:text-red-600 font-bold py-2 px-4 rounded"
                                    onClick={() => toggleModal(recette.idMeal)}
                                >
                                    <FontAwesomeIcon icon={faPlus}/>
                                </button>
                            </div>
                            <div className="flex-1">
                                <button
                                    className="bg-gray-100 dark:bg-white hover:text-red-600 font-bold py-2 px-4 rounded"
                                    onClick={togglePlanningModal}
                                >
                                    <FontAwesomeIcon icon={faClock}/>
                                </button>
                            </div>
                            <div className="flex-1 text-right">
                                <button
                                    className="text-sm font-medium text-indigo-500 dark:text-indigo-600 bg-gray-100 dark:bg-white p-2 rounded hover:underline"
                                    onClick={() => navigate(`/recette/${recette.idMeal}`)}>See more
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <ListModale isOpen={showModal} onClose={() => toggleModal(-1)} recetteId={selectedRecette} />
                <PlanningModale isOpen={showPlanningModal} onClose={togglePlanningModal} />
            </div>
        </div>
    );
};

export default ListeRecette;
