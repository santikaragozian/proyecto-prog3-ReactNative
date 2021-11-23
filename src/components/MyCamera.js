import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
 import { Camera } from 'expo-camera';
 import { db, storage} from '../firebase/config';
 

 class MyCamera extends Component{
     
    constructor(props){
        super(props);
        this.state= {
            permission: false, //permisos de la camara en el dispositivo
            photo: '', //guardar la url de la foto
            showCamera: true,
        }
        this.camera //la referncia a esta camera.
    }

    componentDidMount(){
        Camera.requestMicrophonePermissionsAsync()
        .then(()=>{
            this.setState({
                permission: true,
            }  
            )
        })
        .catch( error => console.log(error)) 
      //Investigar
        // console.log(Camera);
       //  Console.log(this.camera);
    }

    takePicture(){
        this.camera.takePictureAsync()
        .then( (photo)=>{
            this.setState=({
                photo: photo.uri, //la ruta interna temporal de la foto.
                showCamera: false,
            })
            
        })
        .catch( error => console.log(error))
    }

    savePhoto(){
        //tiene que buscar la foto de la uri temporal y subirla al storage
        fetch(this.state.photo)
         .then( res => res.blob())
         .then(image =>{
             const ref = storage.ref(`photos/${Date.now()}.jpg`)
             ref.put(image)
             .then( ()=>{ 
                     ref.getDownloadURL()
                    .then( url => {
                        this.props.onImageUpload(url);
                        this.setState({
                            photo: '',
                        })
                    }
                        )
                    .catch( error=> console.log(error))
                })
             .catch( error=> console.log(error))

         })
         .catch( error=> console.log(error))
    }

    clear(){
        //cambiar el estado de photo a ',
        //cambiar showcamera a true
    }


    render(){
        return(
            <View style={styles.container}>
            {
                this.state.permission ?

                    this.state.showCamera === false ?
                    <React.Fragment>
                       
                        <Image
                          style={styles.cameraBody}
                          source={{uri:this.state.photo}}
                        />
                          
                        <View>
                            <TouchableOpacity onPress={()=> this.savePhoto()} >
                            <Text> Aceptar </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.clear()}>
                                <Text>Rechazar</Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>:

                <View style={styles.container}>
                <Camera 
                     style= {styles.cameraBody} 
                     type= {Camera.Constants.Type.back}
                     ref= { reference => this.camera = reference} 
                  />
                  <TouchableOpacity style={styles.button} onPress= { ()=> this.takePicture()} >
                      <Text> Sacar Foto </Text>
                  </TouchableOpacity>
                </View>
                :
                <Text> No tienes permiso para usar la camara </Text>
            }
            </View>
        )      
    }

 }

const styles=StyleSheet.create({
    container:{
        flex: 1,
    },
    cameraBody:{
        flex: 7,
    },
    button: {
        flex:1,
        justifyContent: 'Center',
    }

})

 export default MyCamera;