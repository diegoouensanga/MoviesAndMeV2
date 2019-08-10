import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation"
//Pour exporter et utiliser une navigation dans l'appli, il faut utiliser un container


import React from 'react'
import { StyleSheet, Image } from 'react-native'

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'



const SearchStackNavigator = createStackNavigator({
    /* creation du stacknavigator
     s'initialise avec toutes les vues qu'il va contenir*/

    Search: {
        // pas obligé de mettre le mm nom que le compo mais c + logik
        screen: Search, // initialisation
        navigationOptions: {
            title: "Rechercher" //titre de la barre de navigation
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})


const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'Favoris'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon:() => {
                return <Image
                    source={require('../Images/ic_search.png')}
                    style={styles.icon}/>
                    }
        }
    },
    Favorites: {
        screen: FavoritesStackNavigator,
        navigationOptions: {
            tabBarIcon:() => {
                return <Image
                    source={require('../Images/ic_favorite.png')}
                    style={styles.icon}/>
            }
        }
  }
}, {
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF'
    }
})

const styles = StyleSheet.create({
  icon: {
      width: 30,
      height: 30
  }
})



export default createAppContainer(MoviesTabNavigator)

