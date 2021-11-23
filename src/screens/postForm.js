import React, {Component} from 'react'
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native'
import {auth, db} from '../firebase/config'
import MyCamera from '../components/MyCamera'

class PostForm extends Component{
    constructor(){
        super()
        this.state = {
            textoPost: '',
            showCamera:true,
            url: ''
        }
    }

    submitPost(){
        console.log('posteando');
        db.collection('posts').add({
            owner: auth.currentUser.email,
            texto: this.state.textoPost,
            createdAt: Date.now(),
            photo: this.state.url,
        })
        .then( ()=>{
            this.setState({
                textoPost: ''
            })
            //Redireccion
            this.props.drawerProps.navigation.navigate('Home')
        })
        .catch()
    }

    onImageUpload(url){
        this.setState({
            showCamera: false,
            url: url,
        })
    }

    render(){
        return(
        <View style={styles.container}>
            {
               this.state.showCamera?
               <MyCamera onImageUpload={(url)=>{this.onImageUpload(url)}} />:
               <View style={styles.container}>

                <TextInput 
                style={styles.field}
                keyboardType='default'
                placeholder='Escribir Aqui'
                onChangeText={ (text) => this.setState({textoPost: text}) }
                multiline
                />

                <TouchableOpacity style={styles.button} onPress={ () => this.submitPost() }>
                    <Text style={styles.textButton}>Guardar</Text>
                </TouchableOpacity>

            </View> 
            }       
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop:20,
        flex: 1
    },

    field:{
        height:100,
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
    
    error:{
        color:'#ff0000'
    }

  })

export default PostForm