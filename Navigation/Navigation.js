import {createStackNavigator, createAppContainer} from "react-navigation";
//Pour exporter et utiliser une navigation dans l'appli, il faut utiliser un container

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
const SearchStackNavigator = createStackNavigator({   /* creation du stacknavigator
    // s'initialise avec toutes les vues qu'il va contenir*/

    Search:{ // pas obligé de mettre le mm nom que le compo mais c + logik
        screen: Search, // initialisation
        navigationOptions: {
            title: "Rechercher" //titre de la barre de navigation
        }
    },
    FilmDetail:{
        screen: FilmDetail
    }
})

export default createAppContainer(SearchStackNavigator)

