import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert, FlatList } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { render } from 'react-dom';
import MyHeader from '../Components/MyHeader';
import {ListItem} from 'react-native-elements';
export default class BookDonateScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            requestedBookList: [],
        }
        this.requestref = null;
    }
    getrequestedbook=()=>{
        this.requestref = db.collection('Request_Books').onSnapshot((snapshot)=>{
            var books = snapshot.docs.map(document=>document.data()
            )
            this.setState({
                requestedBookList: books
            })
        })
    }
    componentDidMount(){
        this.getrequestedbook()
    }
    componentWillUnmount(){
        this.requestref;
    }
    keyExtractor=(item,index)=>index.toString()

    renderItem=({item,i})=>{
    // console.log(item)
    return(
        <ListItem
        style={styles.boxstyle}
        key={i}
        title={item.BookName}
        subtitle={item.ReasonForRequest}
        subtitleStyle={{fontWeight:"bold"}}
        titleStyle={{color:"turquoise"}}
        rightElement={
            <TouchableOpacity 
            style={{width:30, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius:10,}}
            onPress={()=>{
            // alert("Hello," + firebase.auth().currentUser.email + ".")
            console.log("Inside book donate.");
            this.props.navigation.navigate('Receiver', {"details": item})
            }}
            >
            <Text style={{color:"blue"}}>
                Details
            </Text>
            </TouchableOpacity>
            }    
            bottomDivider
        >
        </ListItem>
    )
    }
    render(){
        return(
            <View style={{flex:1}}>
            <MyHeader title={ "Donate Books:"} navigation={this.props.navigation}></MyHeader>
            <View style={{flex:1}}>
            {
              this.state.requestedBookList.length===0
              ?
              (
              <View>
                <Text style={{flex:1, fontSize: 20, justifyContent: 'center', alignItems: 'center'}}>{"Generally, all of the books requested by our users, like you, " + firebase.auth().currentUser.email + " would be here. However, as of now, there are no pending requests. To make one, go to the exchange screen."}</Text>
               </View>
              )  
              :
              (
              <FlatList keyExtractor={this.keyExtractor} 
              data={this.state.requestedBookList}
              renderItem={
                  this.renderItem
              }
              >
              </FlatList>
              )
            }    
            </View></View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    boxstyle: {
      backgroundColor: 'lightblue',
      padding:10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    itemContainer: {
      height: 80,
      width:'100%',
      borderWidth: 2,
      borderColor: 'turquoise',
      justifyContent:'center',
      alignSelf: 'center',
    }
  });