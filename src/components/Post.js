import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons'
import { db, auth } from '../firebase/config'



class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            likes: 0,
            myLike: false,
        }
    }

    componentDidMount(){
        if(this.props.postData.data.likes){
            this.setState({
                likes: this.props.postData.data.likes.length,
                myLike: this.props.postData.data.likes.includes(auth.currentUser.email),
            })
        } else {
            this.setState({
                /* likes: this.props.postData.data.likes.length, */
                myLike: false
            })
        }
    }

    darLike(){
        //Agregar mi usuario a un array de usuarios que likearon
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        //Cambiar estado
        .then(()=>{
            this.setState({
                likes: this.props.postData.data.likes.length,
                myLike: true
            })
        })
        
    }

    quitarLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes: this.props.postData.data.likes.length,
                myLike: false
            })
        })
    }
    
    render(){
        //console.log(this.props);
        return(
            <View style={styles.container} >
                
                {
                    this.state.myLike == false ?
                    <TouchableOpacity onPress={()=>this.darLike()}>
                        <FontAwesomeIcon style={styles.icon} icon={farFaHeart} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={()=>this.quitarLike()}>
                        <FontAwesomeIcon style={styles.icon} icon={fasFaHeart} />
                    </TouchableOpacity>
                }

                <Text style={styles.likes} ><b>likes: {this.state.likes} </b></Text>
                <Text style={styles.user}><b>{this.props.postData.data.owner}:</b> {this.props.postData.data.texto}</Text> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    },

    likes: {
        paddingBottom: 2,
        paddingTop: 3,
    },

    icon: {
        color: 'red'
    },
})

export default Post