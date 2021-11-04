import React, {Component} from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from "../screens/home";
import Register from "../screens/register";
import Login from '../screens/login'
import Perfil from '../screens/perfil';
import PostForm from '../screens/postForm';

const Drawer = createDrawerNavigator()

class Menu extends Component{
    constructor(){
        super()
        this.state = {
            logueado: false,
        }
    }

    render(){
        return(
            this.state.logueado == false ?
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name='Home' component={() => <Home />} />
                    <Drawer.Screen name='Registro' component={() => <Register />} />
                    <Drawer.Screen name='Login' component={() => <Login />} />
                </Drawer.Navigator>
            </NavigationContainer> :
            <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='Home' component={() => <Home />} />
                <Drawer.Screen name='New Post' component={() => <PostForm /> } />
                <Drawer.Screen name='Perfil' component={() => <Perfil /> } />
            </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

export default Menu