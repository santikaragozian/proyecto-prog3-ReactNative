import React, {Component} from 'react'
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native'

class Perfil extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return(
            <View>
                <Text style={styles.textoPerfil}> E-mail: {this.props.user.email} </Text>
                <Text style={styles.textoPerfil}> Usuario creado el: {this.props.user.metadata.creationTime} </Text>
                <Text style={styles.textoPerfil}> Ultimo login: {this.props.user.metadata.lastSignInTime} </Text>

                <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
                    <Text style={styles.textButton}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textoPerfil:{

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