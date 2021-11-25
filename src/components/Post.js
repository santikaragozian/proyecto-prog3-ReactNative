import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity,Modal, TextInput,FlatList} from 'react-native'
import firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart as farFaHeart , faComment, faTrashAlt} from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons'
import { db, auth } from '../firebase/config'



class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            likes: 0,
            myLike: false,
            showModal: false, //vista del modal
            comment: '', //para limpiar el campo despues de enviar
            myPost: true,
            text: '',
        }
    }

    componentDidMount(){
        if(this.props.postData.data.likes){
            this.setState({
                likes: this.props.postData.data.likes.length,
                myLike: this.props.postData.data.likes.includes(auth.currentUser.email),
            })
        } /* else {
            this.setState({
                myLike: false
            })
        } */
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

    showModal(){
        this.setState({
            showModal: true,
        })
    }

    hideModal(){
        this.setState({
            showModal: false,
        })
    }

    guardarComentario(){
        console.log('guardando comentario.....');
        let oneComment={
            createdAt: Date.now(),
            author:auth.currentUser.email,
            comment: this.state.comment, 
        }

        db.collection('posts').doc(this.props.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=>{
            this.setState({
                comment: ''
            })
        })



    }
    
    deletePost(){
        db.collection('posts').doc(this.props.postData.id).delete()
        .then(()=>{
            console.log('posteo borrado');
        })
    }  

    render(){
        console.log(auth.currentUser);
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

                <TouchableOpacity onPress={()=> this.showModal()} >
                    <FontAwesomeIcon style={styles.commentIcon} icon={faComment}/>
                </TouchableOpacity>
                {
                    this.state.showModal ?
                    <Modal style={styles.modalContainer} visible={this.state.showModal} animationType='slide' transparent={false}>
                        <TouchableOpacity onPress={()=>this.hideModal()}>
                        <Text style={styles.cerrarBotton}>X</Text>
                        </TouchableOpacity>
                        
                        <FlatList
                            data={this.props.postData.data.comments}
                            keyExtractor={(comment)=>comment.createdAt.toString()}
                            renderItem={ ({item}) => <Text>{item.author}: {item.comment}</Text> }
                        />

                        <View>
                        <TextInput 
                        style={styles.field} 
                        placeholder="Comentar..." 
                        keyboardType="default" 
                        multiline 
                        onChangeText={text => this.setState({comment:text})} 
                        value={this.state.comment} 
                        />
                        <TouchableOpacity 
                        style={styles.button} 
                        onPress={()=>this.guardarComentario()}>
                        <Text style={styles.textButton}> Guardar Comentario</Text>
                        </TouchableOpacity>
                        </View>
                    </Modal> :
                    <Text></Text>

                }


           

                <Text style={styles.likes} ><b>likes: {this.state.likes} </b></Text>
                <Text style={styles.user}><b>{this.props.postData.data.owner}:</b> {this.props.postData.data.texto}</Text> 

                {
                    this.props.postData.data.owner === auth.currentUser.email ?
                
                <TouchableOpacity onPress={()=>this.deletePost()} >
                    <FontAwesomeIcon style={styles.trash} icon={faTrashAlt} ></FontAwesomeIcon>
                </TouchableOpacity>  :
                <Text></Text>
                }
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
        padding: 10,
    },

    modalContainer:{
        width:'97%',
        borderRadius: 4,
        padding:5,
        alignSelf: 'center',
        boxShadow: 'rgb(204 204 204) 0px 0px 9px 7px',
        marginTop: 20,
        marginBottom:10,

    },
    likes: {
        paddingBottom: 2,
        paddingTop: 3,
    },

    icon: {
        color: 'red',
    },

    commentIcon: {
        paddingTop: 3
    },

    cerrarBotton:{
        color: '#fff',
        padding: 5,
        backgroundColor: '#dc3545',
        alignSelf: 'flex-end',
        paddingHorizontal:8
    },

    field:{
        height:40,
        paddingVertical:15,
        paddingHorizontal:10,
        borderWidth:1,
        borderColor:'#ccc',
        borderStyle: 'solid',
        borderRadius:6,
        marginVertical:10,
    },

    button:{
        backgroundColor:'#28a745',
        paddingHorizontal:10,
        paddingVertical:6,
        textAlign: 'center',
        borderRadius:4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor:'#28a745', 
    },  

    textButton:{
        color: '#fff'
    },

    trash:{
        alignSelf: 'flex-end',
    },
})

export default Post