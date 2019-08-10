import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'



class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
            // Si la props isFilmFavorite vaut true, on affiche le 🖤
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../Images/ic_favorite.png')}
                />
            )
        }
    }

    render(){
        //console.log(this.props);
        const {film,displayDetailForFilm} = this.props // on recup le props créé dans la flatlist de search
        //on met les données des films dans une cste
        //on recup la fct displaydetailforfilm

        return(

            <TouchableOpacity //On a remplacé la View par une TouchableOpacity pour détecter un clic
                onPress={() => displayDetailForFilm(film.id)}

                style={styles.main_container}>


                <Image style={styles.ImageContainer}
                       source ={{uri: getImageFromApi(film.poster_path)}}
                />
                <View style={styles.ContentContainer} >
                    <View style={styles.HeaderContainer} >
                        {this._displayFavoriteImage()}
                        <Text style={styles.Titre}>{film.title}</Text>
                        <Text style={styles.Vote}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.DescriptionContainer} >
                        <Text style={styles.Description} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.DateContainer} >
                        <Text style={styles.Date}>Sorti le {film.release_date}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    main_container: {
        height: 200,
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20
    },

    ImageContainer:{
        height:200,
        width: 120,
        margin: 5,
        flex: 1 ,
        backgroundColor:'gray'

    },
    ContentContainer:{
        flexDirection: 'column',
        flex: 2,
    },
    HeaderContainer:{
        flexDirection: 'row',
        flex : 1
    },

    Titre: {
        fontWeight: 'bold',
        fontSize: 17, flexWrap: 'wrap',
        paddingRight: 5
    },

    Vote: {

        fontSize: 25,
        flexWrap: 'wrap',
        color: '#666666',
        textAlign: 'right'
    },

    DescriptionContainer:{
        flex: 3
    },

    Description: {
        fontSize: 10,
        flexWrap: 'wrap',
        paddingRight: 5,
        fontStyle: 'italic',

    },

    DateContainer:{
        flex: 1 ,
        textAlign: 'right'

    },
    Date:{

        textAlign: 'right'

    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})

export default FilmItem