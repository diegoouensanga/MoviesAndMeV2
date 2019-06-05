import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {



    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.searchedText = ""
        this.state = {
            films: [],
            isLoading: false
        }
    }

    _loadFilms() {
        this.setState({isLoading: true})
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages

                    this.setState({
                        films: [...this.state.films, ...data.results],
                        // ou films: this.state.films.concat(data.results),
                        /* on crée une copie du tableau de films déja récupéré
                        et un tableau des nouveaux films récupérés de l'API
                        et on les met dans un tableau pour les concaténer */

                        isLoading: false
                    })
                }
            )
            // getFilmsFromApiWithSearchedText("star").then(data => console.log(data))
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
        }


        _searchFilms(){
            this.page = 0
            this.totalPages = 0
            this.setState({
                films: []
            }, () => {

            console.log("Page :" + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
            this._loadFilms()
            })
        }


    _searchTextInputChanged(text) {
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
                    onChangeText={(text) => this._searchTextInputChanged(text)}

                />
                <Button style={{height: 50}} title="Rechercher" onPress={() => this._searchFilms()}/>

                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                    onEndReachThreashold={0.5}
                    onEndReached={() => {

                        console.log("onEndReached")
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 25,
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
        position: 'absolute',  // Vue de chargement par dessus l'écran
        left: 0,
        right: 0,
        top: 100, // Pour que la vue ne passe pas devant les boutons d'input et rechercher
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Search
