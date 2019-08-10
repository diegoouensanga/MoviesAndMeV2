import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        //console.log("Display film " + idFilm)
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films} //données qu'on va afficher
                extraData={this.props.favoritesFilm} // on utilise la prop extradata
                // pour indiquer à la flatlist que d'autres données doivent etre
                //prises en compte si on lui demande de se re-rendre
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <FilmItem
                        film={item} // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(
                            film => film.id === item.id) !== -1) ? true : false}
                        // pour différencier les films déjà présent dans notre state
                        // global et qui n'ont donc pas besoin d'être récupérés depuis l'API

                        displayDetailForFilm={this._displayDetailForFilm}
                    />
                )}

                // rendu des données
                // on créé une props film au component FilmItem
                // on créé la prop displaydetail for film pour faire passer la fct de FilmDetail

                onEndReachedThreshold={0.5}
                onEndReached={() => {

                    // La endreach est définie à la moitié de la longueur de la flatlist affichée

                    if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
                        // On vérifie également qu'on n'a pas atteint la fin de
                        // la pagination (totalPages) avant de charger plus d'éléments
                        // On appelle la méthode loadFilm du component Search pour charger plus de films

                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmList)