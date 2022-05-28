import React, {useState, useEffect, createContext, Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput,
        Button, ToastAndroid , TouchableHighlight, 
        ImageBackground, Alert, Image, ActivityIndicator, Modal, AsyncStorage, KeyboardAvoidingView
      } from 'react-native';



    const [ isloadin, guardarIsloadin] = useState(true);



const Dialog = () => {
    return(
        <View>
            {isloadin==true 
                        ?  
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={isloadin}
                            onRequestClose={false}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>

                                    <ActivityIndicator style={styles.Indicador} size="large" color="#0000ff" />

                                    <View style={styles.modalText}> 
                                        <Text >Cargando...</Text>
                                    </View>
                                    
                                </View>
                            
                            </View>
                        </Modal>
                        : 
                            <Modal
                            animationType="fade"
                            transparent={true}
                            visible={false}
                            onRequestClose={false}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <ActivityIndicator size="large" color="#0000ff" />

                                    <Text style={styles.modalText}>Cargando...</Text>
                                </View>
                            
                            </View>
                            </Modal>
            }

        </View>
    );
   
}




const style = StyleSheet.create({


    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 120,
    },
    modalView: {
        flexDirection: 'row',
        width: '57%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    Indicador: {
        justifyContent: 'space-evenly',
    }

})
export default Dialog;
