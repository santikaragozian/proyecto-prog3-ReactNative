import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { db } from '../firebase/config'



class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            likes: 0,
            myLike: false,
        }
    }

    darLike(){
        //Agregar mi usuario a un array de usuarios que likearon
            //Updatear el registro (documento)
        db.collection('posts').doc(this.props.postData.id).update({
            likes: '//aca teneemos que pasar la info a actualizar'
        })

        //Cambiar estado
    }
    
    render(){
        console.log(this.props);
        return(
            <View style={styles.container} >
                <Text>Texto del post: {this.props.postData.data.texto}</Text>
                <Text>user: {this.props.postData.data.owner} </Text>
                <TouchableOpacity>
                    <Text>Me gusta</Text>
                </TouchableOpacity>
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
    }
})

export default Post