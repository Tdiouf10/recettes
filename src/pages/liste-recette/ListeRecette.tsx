import React, { useState, useEffect } from "react";
import axios from "axios";

interface Recette {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
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

    return (
        <div>
            <h1>Liste des recettes</h1>
            {recettes.map((recette) => (
                <div key={recette.idMeal}>
                    <h2>{recette.strMeal}</h2>
                    <img src={recette.strMealThumb} alt={recette.strMeal} />
                    <p>{recette.strInstructions}</p>
                </div>
            ))}
        </div>
    );
};

export default ListeRecette;
