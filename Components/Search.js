import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import {connect} from 'react-redux'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0  // page sur laquelle on est ds la recherche
        this.totalPages = 0  //nb max de pages pour une recherche
        this.searchedText = "" //Texte entré dans la barre
        this.state = {
            films: [],
            isLoading: false // pour que le chargement ne s'afficher pas par défaut
        }

        this._loadFilms = this._loadFilms.bind(this) // #DataBinding
    }

    _loadFilms() {
        //On appelle cette fct qd on clique sur "rechercher"
        //(ds le onpress du button du render)

        this.setState({isLoading: true})
        //setState modifie le state tout en rechargeant le component
        //Quand la recherche commence, le chargement apparait
        if (this.searchedText.length > 0) {
            // on recherche seulement si le text n'est pas vide
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                //+1 sinon on appelle toujours la meme page
                this.page = data.page  //on definit grace aux données de l'api
                this.totalPages = data.total_pages // défini grace aux données de l'api

                    this.setState({
                        films: [...this.state.films, ...data.results],
                        // ou films: this.state.films.concat(data.results),

                        /* on crée une copie du tableau de films déja récupéré
                        et un tableau des nouveaux films récupérés de l'API
                        et on les met dans un tableau pour les concaténer .
                        bref pour pas que le chargement de la nouvelle page remplace l'ancienne
                        mais bien pour qu'elle s'additionne */
                        isLoading: false
                        //Quand la recherche est terminée, le chargement disparait
                    })
                }
            )
            // getFilmsFromApiWithSearchedText("star").then(data => console.log(data))
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

        _searchFilms(){
        //On remet les données à 0 quand on refait une recherche
            // pour pas que ça s'additionne à la recherche d'avant.
            this.page = 0
            this.totalPages = 0
            this.setState({
                films: []
            }, () => {

            //console.log("Page :" + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms() //Pour bien remettre les films à 0 dans les logs car le setState est ASYNCHRONE
            })
        }

        _displayDetailForFilm = (idFilm) => {
        // passer de la vue recherche à la vue filmDetails
        //console.log("Display film with id" + idFilm);
            // passage de la vue Search à la vue FilmDetail
            this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
            //paramètres qu'on veut faire passer
        }


    _displayLoading() { // quand le booléen vaut true, affiche un activityindicator
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _searchTextInputChanged(text) { //chaque fois qu'un texte est appelé, on appelle
        this.searchedText= text
    }


    render() {
        // console.log("RENDER");
        //console.log(this.state.isLoading);
        return (
            <View style={styles.main_container}>

                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onSubmitEditing={() => this._searchFilms()}
                    // Pour rechercher en appuyant sur le bouton 'OK' du clavier
                    onChangeText={(text) => this._searchTextInputChanged(text)}

                />
                <Button style={{height: 50}} title="Rechercher" onPress={() => this._searchFilms()}/>

                <FilmList
                    films={this.state.films} // C'est bien le component Search qui récupère les films
                    // depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation
                    // pour permettre au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne
                    // l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur
                    // aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile,
                    // côté component FilmList, pour ne pas déclencher l'évènement pour charger
                    // plus de film si on a atteint la dernière page
                    favoriteList={false} // booléen à false pour indiquer qu'on n'est pas dans
                    // le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir
                    // déclencher le chargement de plus de films lorsque l'utilisateur scrolle.



                />
                {this._displayLoading()}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    main_container: {

        flex: 1
    },

    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',  // Vue de chargement (activityindic) par dessus l'écran
        left: 0,
        right: 0,
        top: 100, // Pour que l'activityindic ne passe pas devant les boutons d'input et rechercher
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
//const mapStateToProps = state => {
 //   return {
//        favoritesFilm: state.favoritesFilm
//    }
//}

//export default connect(mapStateToProps)(Search)

export default Search
