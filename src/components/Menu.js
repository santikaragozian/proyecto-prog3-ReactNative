import React, {Component} from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from "../screens/home";
import Register from "../screens/register";
import Login from '../screens/login'
import Perfil from '../screens/perfil';
import PostForm from '../screens/postForm';
import { auth } from '../firebase/config';

const Drawer = createDrawerNavigator()

class Menu extends Component{
    constructor(){
        super()
        this.state = {
            logueado: false,
            user: '',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({
                    logueado: true,
                    user: user,
                })
            }
        })
    }

    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( () => {
                console.log('Regsitrado');
            })
            .catch( error => {
                console.log(error);
                this.setState({
                    errorMessage: error.message
                })
            })
    }

    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
            .then( (response) => {      
                console.log('logueado');
                console.log(response);
                this.setState({
                    logueado: true,
                    user: response.user
                })
                
            })
            .catch( error => {
                console.log(error);
                this.setState({
                    errorMessage: error.message
                })
            })
    }

    logout(){
        auth.signOut()
        .then( (res) => {
            this.setState({
                user: '',
                logueado: false,
            })
        })
    }

    render(){
        return(
            this.state.logueado == false ?
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name='Login' component={() => <Login login={ (email,pass) => this.login(email,pass) } />} />
                    <Drawer.Screen name='Registro' component={(drawerProps) => <Register drawerProps={drawerProps} register={ (email,pass) => this.register(email, pass)} />} />
                </Drawer.Navigator>
            </NavigationContainer> :
            <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='Home' component={() => <Home />} />
                <Drawer.Screen name='New Post' component={(drawerProps) => <PostForm drawerProps={drawerProps} /> } />
                <Drawer.Screen name='Perfil' component={() => <Perfil user={this.state.user} logout={ () => this.logout() } /> } />
            </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

export default Menu