import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert, Dimensions, Animated, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { render } from 'react-dom';
import MyHeader from '../Components/MyHeader';
import {ListItem, Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';

export default class SwipeableFlatList extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            allNotifications:this.props.allNotifications
        }
    }

    renderItem=(data)=>{
        return(
            <Animated.View>
            <ListItem
            leftElement = {<Icon name='book' color='book' fontType='font-awesome'/>}
            title={data.item.BookName}
            titleStyle={{color:'turquoise', fontWeight: 'bold'}}
            subtitle={data.item.message}
            bottomDivider
            />
        </Animated.View>
        )
    }

    renderHiddenItem=()=>{
        return(
            <View style={styles.SwipeValue}>
            <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
            <Text style={styles.backTextWhite}>
           Mark As Read
            </Text>
            </View>
           </View>
        )
    }

    onSwipeValueChange=(data)=>{
    var allNotifications = this.state.allNotifications
    const {key,value}= data
    console.log(key,value)
    if(value<-Dimensions.get('window').width){
     const notifications = [...allNotifications]
    //  const index = allNotifications.findIndex(item=>item.key===key)
     this.updateMarkAsRead(this.state.allNotifications[key]) 
     notifications.splice(key,1)
     this.setState({
         allNotifications:notifications
     })  
    }  
    }
    updateMarkAsRead=(notification)=>{
    console.log('notification')
    console.log(notification)
    db.collection('allNotifications').doc(notification.docId).update({
        NotificationStatus: 'Read'
    })
    }
    render(){
        return(
            <View style={{flex:1, backgroundColor:'turquoise'}}>
                <SwipeListView
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get('window').width}
                previewRowKey={'0'} 
                previewOpenValue={-100} 
                previewOpenDelay={3000}
                keyExtractor={(item,index)=>index.toString()}
                onSwipeValueChange={this.onSwipeValueChange}
                />
                
            </View>
        )
    }
}

const styles= StyleSheet.create({
   SwipeValue:{
       alignItems: 'center',
       backgroundColor: 'turquoise',
       flex:1,
       justifyContent: 'space-between',
       flexDirection: 'row',
       padding:10
   },
   backRightBtn:{
       alignItems: 'center',
       justfiyContent: 'center',
       bottom: 0,
       position: 'absolute',
       top: 0,
       width: 100,
   },
   backRightBtnLeft:{
       backgroundColor: 'turquoise',
       right: 0,
   },
   backTextWhite:{
       color:'white',
       fontWeight:'bold',
       fontSize: 20
   }
})