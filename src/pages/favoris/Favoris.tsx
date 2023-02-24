import useFavoris from "../../components/hooks/useFavoris"

const Favoris = (): JSX.Element => {

    const FavorisLists = useFavoris({action:'getAll'})

    if (!FavorisLists) return (<h2>Chargement...</h2>);

    return (
        <>
            <h1>
                Favoris
            </h1>
            <div>
                {Object.keys(FavorisLists).map(favListName => {
                return                <div>
                    <h2><strong>{favListName}</strong></h2>
                    <div>
                        {FavorisLists[favListName].map(recette =>
                         <div>
                            {recette.strMeal}
                         </div>       
                        )}
                    </div>
                </div>}
                )}
            </div>
        </>
    )
}

export default Favoris