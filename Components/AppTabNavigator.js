import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';
import {AppStackNavigator} from './AppStackNavigator'

export const AppTabNavigator=createBottomTabNavigator({
    Donate:{
    screen:AppStackNavigator,
    navigationOptions:{
    tabBarIcon:
    <Image  source={require("../assets/donate.png")} style={{width:20,height:20}}/>,  
    tabBarLabel:"Donate A Book"
   }
    },
    Request:{
    screen:BookRequestScreen,
    navigationOptions:{
        tabBarIcon:
        <Image source={require("../assets/images-main/request-book.png")} style={{width:20,height:20}}/>,
        tabBarLabel:"Request A Book"
    }
    },
})