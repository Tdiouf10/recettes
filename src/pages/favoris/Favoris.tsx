import useFavoris from "../../components/hooks/useFavoris"

const Favoris = (): JSX.Element => {

    const FavorisManager = useFavoris()
    console.log(FavorisManager.FavorisList)
    FavorisManager.getFavorisList();
    console.log(FavorisManager.FavorisList)

    return (
        <>
            <h2>
                Favoris
            </h2>
            <div>
                
            </div>
        </>
    )
}

export default Favoris