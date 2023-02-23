import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { db } from '../../firebase'
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../provider/AuthProvider";


type FavorisLists = Record<string, Recette[]>

interface Recette {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
}

const useFavoris = () => {

    const {user}: any = useContext(AuthContext)
    const [FavorisList, setFavorisList] = useState<FavorisLists>();

    useEffect(() => {
        fetchFavorisList();
    }, [])

    async function fetchFavorisList() {

        const docRef = doc(db, "Favoris", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const docData = docSnap.data();
            const FavorisListData = [] as any;
            
            for (const key in docData) {
                const recetteList = await fetchRecettes(docData[key]);
                FavorisListData[key] = recetteList;
            }
            setFavorisList(FavorisListData);
        } 
    }

    async function fetchRecettes(RecetteIds:number[]) {

        const recettes = await Promise.all(
            RecetteIds.map(  recetteId => 
                axios
                .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recetteId}`)
                .then((response) => {
                    return response.data.meals[0] as Recette;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                })
            )
        ) as Recette[];
        
        return recettes;
    }


    /*
        const updateFavoris = async (id:Number, ) => {
            try {
                const docToUpdate = doc(db, 'todos', id)
                await updateDoc(docToUpdate, { completed })
            } catch (error) {
                console.error('Error updating document -> ', error)
            }
        }

        const removeTodo = async (id) => {
            try {
                const docToDelete = doc(db, 'todos', id)
                await deleteDoc(docToDelete)
            } catch (error) {
                console.error('Error deleting document -> ', error)
            }
        }

        */

    return FavorisList;
};

export default useFavoris;
