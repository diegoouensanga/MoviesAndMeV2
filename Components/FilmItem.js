import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class FilmItem extends React.Component {
    render(){
        //console.log(this.props);
        const film = this.props.film
        return(

            <View style={styles.main_container} >

                <Image style={styles.ImageContainer}
                source ={{uri: "image"}}
                />

                <View style={styles.ContentContainer} >
                    <View style={styles.HeaderContainer} >
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

            </View>
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
})

export default FilmItem