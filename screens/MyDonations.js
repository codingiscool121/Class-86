import React from 'react'
import {View,Text, StyleSheet, FlatList} from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import {Card} from 'react-native-elements';
import {ListItem} from 'react-native-elements';

export default class MyDonations extends React.Component{
    constructor(props){
    super(props)
    this.state={
    DonorId: firebase.auth().currentUser.email,
    DonorName: "",
    AllDonations: []
    }
    this.requestRef=null
    }
    getDonorDetails=()=>{
    db.collection("usersbetter").where('UserId', '==', this.state.DonorId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                DonorName:doc.data().Username
            })
        })
    })
    }
    getAllDonations=()=>{
        this.requestRef=db.collection('allDonations').where('DonorId', '==', this.state.DonorId)
        .onSnapshot(snapshot=>{
        var allDonations=[]
        snapshot.docs.map(
            doc=>{
                var donation = doc.data()
                donation["docId"]=doc.id
                allDonations.push(donation)
            }
        )
        this.setState({
            allDonations:allDonations
        })
        })
    }
    keyExtractor=(item,index)=>index.toString()


    sendBook=(BookDetails)=>{
    if(BookDetails.RequestStatus==="Book Sent"){
    var RequestStatus="Donor Interested";
    db.collection('allDonations').doc(BookDetails.docId).update({
        RequestStatus:RequestStatus
    })
    this.sendNotification(BookDetails,RequestStatus);
    }else{
        var RequestStatus="Book Sent"
        db.collection('allDonations').doc(BookDetails.docId).update({
            RequestStatus: RequestStatus
        })
        this.sendNotification(BookDetails,RequestStatus)
    }
    }
    sendNotification=(BookDetails,RequestStatus)=>{
    var RequestId = BookDetails.RequestId
    var DonorId = BookDetails.DonorId
    db.collection('allNotifications').where("RequestId", '==', RequestId).where("DonorId", "==", DonorId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            var message=""
            if(RequestStatus==="Book Sent"){
                message= this.state.DonorName + " has sent you your book." 
            }else{
                message=this.state.DonorName + " is interested in sending you your book, but has not gotten to it yet. It should come soon." 
            }
            db.collection('allNotifications').doc(doc.id).update({
              message: message,
              NotificationStatus: "Unread",
              Date: firebase.firestore.FieldValue.serverTimestamp()
            })
        })
    })
    }
    renderItem=({item,i})=>{
    // console.log(item)
    return(
        <ListItem
        style={styles.boxstyle}
        key={i}
        title={item.BookName}
        subtitle={"Receiver Name: " + item.ReceiverName}
        subtitleStyle={{fontWeight:"bold"}}
        titleStyle={{color:"turquoise"}}
        rightElement={
            <TouchableOpacity 
            style={{width:30, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius:10,}}
            onPress={()=>{
            this.sendBook(item);
            }}
            >
            <Text style={{color:"blue"}}>
                {
                    item.RequestStatus==="Book Sent"
                    ?(
                    "Book Sent"
                    ):(
                    "Send Book"
                    )
                }
            </Text>
            </TouchableOpacity>
            }    
            bottomDivider
        >
        </ListItem>
    )
    }
    componentDidMount(){
        this.getDonorDetails();
        this.getAllDonations();
    }
    componentWillUnmount(){
        this.requestRef
    }
render(){
    return(
<View style={{flex:1}}>
{
    this.state.allDonations===0
    ?(
    <Text>{"You have not donated any books, " + this.state.DonorName}</Text>
    ):(
    <FlatList
    keyExtractor={this.keyExtractor}
    data={this.state.allDonations}
    renderItem={this.renderItem} 
    >

    </FlatList>
    )
}
</View>
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