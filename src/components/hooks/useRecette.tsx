import React, { useState, useEffect } from "react";
import axios from "axios";

interface Recette {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
    strTags: string;
    strArea: string;
}

const ListeRecette = () => {
    const [recettes, setRecettes] = useState<Recette[]>([]);

    useEffect(() => {
        axios
            .get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
            .then((response) => {
                setRecettes(response.data.meals);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return recettes;
};

export default ListeRecette;
