import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { render } from 'react-dom';
import MyHeader from '../Components/MyHeader';
import {DrawerItems} from 'react-navigation-drawer';
import Welcome from '../screens/Welcome';
export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flex: 1}}>
            <View style={{flex:0.8}}>
            <DrawerItems  {...this.props}  >
             
            </DrawerItems>
            </View>
            <View style={{flex:0.2, justifyContent: "flex-end"}}>
                <TouchableOpacity style={{width:'100%', height: 30, backgroundColor: "#39d2d8", justifyContent: 'center'}}
                onPress={()=>{
                    const signout=firebase.auth().signOut()
                    if(signout){
                        this.props.navigation.navigate('Welcome');
                    }else{
                        alert("You could not be signed out," + firebase.auth().currentUser.email  + ".")
                    }
                }}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}