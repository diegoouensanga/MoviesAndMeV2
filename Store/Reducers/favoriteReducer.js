


const initialState = { favoritesFilm: []}

function toggleFavorite(state = initialState, action){
    let nextState
    switch(action.type){
        case 'TOGGLE_FAVORITE':
            //action pour savoir si il faut ajouter ou supprimer un film des favoris
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item =>
                item.id === action.value.id)
            //savoir si il fait partie des favs (fct findindex)
            if (favoriteFilmIndex !== -1){
                // Le film est déja dans les favoris, on le supprime de la liste

                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter ( (item, index) =>
                        index !== favoriteFilmIndex)
                }
            }
            else{
                //Le film n'est pas dans les favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    favoritesFilm:[...state.favoritesFilm, action.value]
                }
            }

                return nextState || state
        // Renvoie l'objet nextState si celui-ci n'est pas undefiner, sinon renvoie l'objet state
        default:
            return state
    }
}
export default toggleFavorite