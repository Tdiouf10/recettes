import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from '../../firebase'
import { updateDoc, deleteDoc, doc, collection, getDocs } from "firebase/firestore";
import ListeRecette from "../../pages/liste-recette/ListeRecette";


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
