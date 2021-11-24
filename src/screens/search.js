import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, TextInput} from 'react-native';
import {db, auth} from '../firebase/config'
import Post from '../components/Post'

class Search extends Component{
constructor(props){
    super(props);
    this.state={
        posteosGuardados: [],
        loading: true

    }
}

componentDidMount(){

}

search(text){
    db.collection('posts').where('email', '==', text).get().then(docs=>{
        let posts=[];
        docs.forEach(doc => {
            posts.push({
                id: doc.id,
                data: doc.data()
            })
        })
        this.setState({
            posteosGuardados: posts
        })
    })
}

render(){
    return(
        <View>

            <Text style={styles.texto}> Buscador de Posts </Text>
            <TextInput style={StyleSheet.input} onChangeText= {(text)=> this.search(text)}/>
            <Text style={StyleSheet.subtitulo}>Resultados:</Text>
            {this.state.posteosGuardados.length > 0 ?
                <FlatList
                data={this.state.posteosGuardados} 
                keyExtractor={ post => post.id}
                renderItem={ ({item})=><Post doc={item}/>}
                /> 
                :
                <Text> No existen resultados disponibles</Text>
            }
        </View>

    )
}

}

const styles= StyleSheet.create({
    texto:{
        borderColor: "grey",
        paddingVertical: 15,
        borderWidth: 1,
        borderStyle: "solid",
        height: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 6,
        marginVertical: 15
    },

})

export default Search