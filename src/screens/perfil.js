import React, {Component} from 'react'
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native'
import {db, auth} from '../firebase/config'
import Post from '../components/Post'

class Perfil extends Component{
    constructor(props){
        super(props)
        this.state = {
            posteos: '',
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', this.props.user.email).onSnapshot(
          docs => {
            //Array para crear datos en formato mas util
            let posts = []
            docs.forEach( doc => {
              posts.push({
                id: doc.id,
                data: doc.data(),
              })
            })
            console.log(posts);
    
            this.setState({
              posteos: posts,
            })
          }
        )
      }

    render(){
        return(
            <View>
                <Text style={styles.textoPerfil}> E-mail: {this.props.user.email} </Text>
                <Text style={styles.textoPerfil}> Usuario creado el: {this.props.user.metadata.creationTime} </Text>
                <Text style={styles.textoPerfil}> Ultimo login: {this.props.user.metadata.lastSignInTime} </Text>   
                <Text style={styles.textoPerfil}> Mis posteos: </Text>

                <View style={styles.container}>
                    <FlatList 
                    data= { this.state.posteos }
                    keyExtractor = { post => post.id}
                    renderItem = { ({item}) => <Post postData={item} />}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
                    <Text style={styles.textButton}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10,
    },

    textoPerfil:{
        marginBottom: 5,
    },

    button: {
        backgroundColor:'rgb(255, 0, 0)',
        paddingHorizontal:10,
        paddingVertical:6,
        textAlign: 'center',
        borderRadius:4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor:'rgb(255, 0, 0)',
        margin: 10,
    },

    textButton:{
        color: '#fff'
    }
})

export default Perfil