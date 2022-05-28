import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableHighlight } from 'react-native'
import { Ionicons, Foundation } from '@expo/vector-icons';
import  globalStyles from '../styles/global';
import  api from '../utils/Api';
import { FAB } from 'react-native-paper';

const Salir = (dato) => {
    const {navigation} = dato
    console.log('dato desde Salir ', dato)
    const [modalSalir, setModalSalir] = useState(false)

    const closeModal = (bool, data) => {
        setModalSalir(bool);
    }

    const aceptarModal = async (bool, data) => {
        var repuesta = await api.post('/api/v1/session/logout');
        console.log('Response salir---->', repuesta)
        await setModalSalir(bool);
        await navigation.navigate('login');
      }

    const ChangeModalSalirVisible = (bool) => {
        setModalSalir(bool);
    }


    return(

        <View>
            <Text style={{textAlign: 'center', paddingHorizontal: 10, marginTop: 50}}>App móvil para el seguimiento de las rutas de transporte de estudiantes de la 
                Universidad Nacional Experimental Rómulo Gallegos con la que el estudiante podra seguir
                los transporte universitarios en tiempo real</Text>
            <View style={styles.contenedorImg}>
                <Image style={styles.stretch} source={require('../assets/bus.png')} />

               
            </View>

            {modalSalir==true ?
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalSalir}
                    onRequestClose={() => ChangeModalSalirVisible(false)}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalViewSalir}>
                    
                        <Text style={styles.modalText}>Desea Cerrar Sesion?</Text>
                        <View style={styles.ContenedorBotton}>
                            <TouchableHighlight onPress={ () => aceptarModal(false, 'Aceptar')} style={globalStyles.btnSalir}>
                                <Text style={globalStyles.textoSubmitAlerAcept}>Aceptar</Text>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={ () => closeModal(false, 'Cancel')} style={globalStyles.btnCancelar}>
                                <Text style={globalStyles.textoSubmitAlerSalir}>Cancelar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    </View>
                </Modal>

                :

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalSalir}
                    onRequestClose={() => ChangeModalSalirVisible(false)}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalViewSalir}>
                    
                        <Text style={styles.modalText}>Desea Cerrar Sesion?</Text>

                    </View>

                   
                    </View>
                </Modal>
            }
            
            <View style={styles.ImgSalir}>
    
                <FAB
                    style={styles.fab}
                    small
                    icon="power"
                    onPress={() => ChangeModalSalirVisible(true)}
                  />
                <Text style={styles.SalirFab}>Salir</Text>
            </View>

        </View>
    )
}




export default Salir;

const styles = StyleSheet.create({
    stretch: {
        width: '50%',
        height: 200,
       
    },

    contenedorImg: {
        marginTop: 50,
        alignItems: 'center'
    },

    ImgSalir: {
        marginTop: 80,
        alignItems: 'center'
    },
    ContenedorBotton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 90,
    },

    modalViewSalir: {
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '85%',
        height: '28%',
        paddingHorizontal: 10,
        paddingVertical: '10%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    modalText: {
        marginBottom: 50,
        paddingHorizontal: 60,
        fontSize: 14
    },
    fab: {
        margin: 20,
        right: 0,
        bottom: 0,
    },
    SalirFab: {
        marginTop: -18,
    }
})