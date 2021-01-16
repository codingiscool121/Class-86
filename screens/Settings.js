import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { render } from 'react-dom';
import MyHeader from '../Components/MyHeader';


export default class Settings extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Username:"",
            PhoneNumber:"",
            UserId:"",
            Address:"",
            docId:""
        }
    }

    componentDidMount(){
        this.getDetails()
    }


    updateDetails=()=>{
        db.collection('usersbetter').doc(this.state.docId).update({
            Username:this.state.Username,
            PhoneNumber: this.state.PhoneNumber,
            Address:this.state.Address
        })
        alert("Hello " + this.state.Username + ". Your personal information has been successfully updated.")
    }
    getDetails=()=>{
        var user = firebase.auth().currentUser.email
        db.collection('usersbetter').where('UserId', '==', user).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data=doc.data()
                console.log(data)
                this.setState({
                    Username:data.Username,
                    PhoneNumber:data.PhoneNumber,
                    UserId: data.UserId,
                    Address:data.Address,
                    docId:doc.id
                })
            })
        })
    }
    render(){
        return(
            <View>
               <MyHeader title={ "Settings"} navigation={this.props.navigation}></MyHeader>
                <TextInput placeholder="Username"  
                style={styles.personalInfoBox}
                onChangeText={text=>{
                    this.setState({
                        Username:text,
                    })
                }}
                value={this.state.Username}
                ></TextInput>
                <TextInput placeholder="Phone Number"
                onChangeText={phonenumber=>{
                    this.setState({
                        PhoneNumber:phonenumber,
                    })
                }}
                 style={styles.personalInfoBox}
                value={this.state.PhoneNumber}
                ></TextInput>
                <TextInput placeholder="Address"
               style={styles.personalInfoBox}
                multiline={true}
                onChangeText={address=>{
                    this.setState({
                        Address:address
                    })
                }}
                value={this.state.Address}
                ></TextInput>
                <TouchableOpacity
                onPress={()=>{
                    this.updateDetails()
                }}
                style={styles.button}
                >
                <Text>Update</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor:'white',
    },
    personalInfoBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        alignSelf:"center",
        justifyContent: 'center',
        borderColor:"#00873E"
    },
    button:{
        fontSize:30,
        textAlign:"center",
        marginBottom:50,
        alignSelf:"center",
        backgroundColor:'#c54245',
        height:60,
        width:120,
        paddingTop:13,
        borderWidth:3,
        borderRadius:1,
        justifyContent:"center"
    },

    title:{
        fontSize: 40,
        textAlign:'center',
        alignSelf: 'center',
        color:"#00873E"
    }
})
