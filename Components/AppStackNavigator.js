import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Receiver from '../screens/ReceiverDetails';
import BookDonateScreen from '../screens/BookDonateScreen';

export const AppStackNavigator= createStackNavigator({
    BookDonate:{
       screen:BookDonateScreen,
       navigationOptions:{
           headerShown:false
       }
    },
    Receiver:{
        screen:Receiver,
        navigationOptions:{
         headerShown:false
        }
    },
},
    {
        initialRouteName:'BookDonate'
    }
)