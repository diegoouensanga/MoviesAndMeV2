import {createStackNavigator, createAppContainer} from "react-navigation";
//Pour exporter et utiliser une navigation dans l'appli, il faut utiliser un container

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
const SearchStackNavigator = createStackNavigator({   /* creation du stacknavigator
    // s'initialise avec toutes les vues qu'il va contenir*/

    Search:{
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    FilmDetail:{
        screen: FilmDetail
    }
})

export default createAppContainer(SearchStackNavigator)

