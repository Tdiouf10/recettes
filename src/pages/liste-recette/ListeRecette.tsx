import React, { useState, useEffect } from "react";
import axios from "axios";
import useRecette from '../../components/hooks/useRecette'


const ListeRecette = () => {

    const recettes = useRecette();

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
