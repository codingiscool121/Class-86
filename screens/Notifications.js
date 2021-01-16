import React from 'react'
import {View,Text, StyleSheet, FlatList} from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import {Card} from 'react-native-elements';
import {ListItem,Icon} from 'react-native-elements';
import MyHeader from '../Components/MyHeader'
import SwipeableFlatList from '../Components/SwipeableFlatlist'

export default class Notifications extends React.Component{
    constructor(props){
        super(props);
        this.state={
            UserId: firebase.auth().currentUser.email,
            allNotifications: []
        }
        this.notificationref = null;
    }
    componentDidMount(){
        this.getNotification()
    }
    componentWillUnmount(){
        this.notificationref()
    }
    getNotification=()=>{
        this.notificationref= db.collection('allNotifications').where('NotificationStatus', '==', 'Unread').where('ReceiverId', '==', this.state.UserId)
        .onSnapshot(snapshot=>{
            var allNotifications = []
            snapshot.docs.map(doc=>{
                var notification = doc.data()
                notification["docId"]=doc.id
                allNotifications.push(notification)
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    keyExtractor = (item,index)=>index.toString()

    renderItem=({item,index})=>{
    return(
        <ListItem
        key={index}
        leftElement = {<Icon name="book" type="font-Awesome" color = "turquoise"></Icon>}
        title={item.BookName}
        titleStyle={{color: "black", fontWeight:"bold"}}
        subtitle= {item.message}
        bottomDivider
        />
    )
    }
    render(){
        return(
            <View style={{flex:1}}>
            <MyHeader title="Notifications" navigation={this.props.navigation}></MyHeader>
            {
                this.state.allNotifications.length === 0
                ?(
             <Text>You have no notifications.</Text>
                ):(
                    // <FlatList
                    // keyExtractor = {this.keyExtractor}
                    // data={this.state.allNotifications}
                    // renderItem={this.renderItem}
                    // >
                        
                    // </FlatList>
                    <SwipeableFlatList
                    allNotifications={this.state.allNotifications}
                    />
                )
            }
            </View>
        )
    }
}