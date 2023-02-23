import { useState } from "react";


interface Favoris {
    name: string;
    recette: Recette[];
}

interface Recette {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
}

const useFavoris = () => {

    const [FavorisList, setFavorisList] = useState<string>('ancien');



    const FavorisManager = {

        FavorisList: FavorisList,

        
        getFavorisList: async () => {
            
            if (FavorisList !== 'ancien') return FavorisList
            else {
                setTimeout(() =>  setFavorisList('nouveau'), 50)
            }
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
    };

    return FavorisManager;
};

export default useFavoris;
