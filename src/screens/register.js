import React, {Component} from 'react'
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native'


class Register extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
        }
    }

    render(){
        return(
            <View style={styles.container}>

                <Text>Register</Text>

                <TextInput 
                style={styles.field}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={ text => this.setState({email:text}) }
                />

                <TextInput 
                style={styles.field}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={ text => this.setState({password:text}) }
                />

                <Text style={styles.error}> {this.props.errorMessage} </Text>

                <TouchableOpacity style={styles.button} onPress={ () => this.props.register(this.state.email, this.state.password) } >
                    <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop:20
    },

    field:{
        height:20,
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

    error: {
        color: 'red'
    }
    
  })


export default Register