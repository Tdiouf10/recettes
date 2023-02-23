import React, {useState} from "react";
import ListModale from "../../components/ListModale";
import useRecette from '../../components/hooks/useRecette'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const ListeRecette = () => {

    const recettes = useRecette();
    const navigate = useNavigate();
    const [favoris, setFavoris] = useState<{ [key: string]: boolean }>({});
    const [searchQuery, setSearchQuery] = useState("");

    const toggleFavori = (id: string) => {
        setFavoris((prevState) => ({...prevState, [id]: !prevState[id]}));
    };

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const filteredRecettes = recettes.filter((recette: any) =>
        recette.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recette.strCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recette.strTags?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const q = query(collection(db, "Favoris"));
    getDocs(q)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        });

    return (
        <div className="mt-10">
            <form className="navbar-form text-center" action="" autoComplete="off">
                <div className="input-group">
                    <input type="text" name="s" className="form-control p-2 border-b-2 border-b-gray-500"
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
                {filteredRecettes.map((recette: any) => (
                    <div
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
                                            color={favoris[recette.idMeal] ? "red" : "white"}
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
                                    onClick={toggleModal}
                                >
                                    <FontAwesomeIcon icon={faPlus}/>
                                </button>
                                <ListModale isOpen={showModal} onClose={toggleModal}></ListModale>
                            </div>
                            <div className="text-right">
                                <button
                                    className="text-sm font-medium text-indigo-500 dark:text-indigo-600 bg-gray-100 dark:bg-white p-2 rounded hover:underline"
                                    onClick={() => navigate(`/recette/${recette.idMeal}`)}>See more
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListeRecette;
