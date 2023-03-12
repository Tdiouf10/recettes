import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { db } from '../../firebase'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../provider/AuthProvider";


type FavorisLists = Record<string, Recette[]>

interface Recette {
    idMeal: number;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
}

interface props {
    action: string;
    refresh: number;
}

const useFavoris = ({action, refresh}:props) => {
    
    const onlyName = action === 'getListNames';
    const onlyNameAndIds = action === 'getNamesAndIds';
    const {user}: any = useContext(AuthContext)
    const [FavorisList, setFavorisList] = useState<FavorisLists>();

    useEffect(() => {
        fetchFavorisList();
    }, [refresh])

    async function fetchFavorisList() {

        const docRef = doc(db, "Favoris", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const docData = docSnap.data();
            const FavorisListData = [] as any;
            
            for (const key in docData) {
                onlyName 
                ? FavorisListData[key] = []
                : onlyNameAndIds 
                ? FavorisListData[key] = docData[key].map((id:number) => { 
                    return {idMeal:id, strMeal:'', strMealThumb:'', strInstructions:''}})
                : FavorisListData[key] = await fetchRecettes(docData[key]);
            }
            setFavorisList(FavorisListData);
        } else {
            await setDoc(doc(db, "Favoris", user.uid), {
                "Mes Favoris": []
            });
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
