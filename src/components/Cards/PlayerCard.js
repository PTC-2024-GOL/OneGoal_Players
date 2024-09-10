import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import soccer from '../../../assets/Player-soccer.png'; // Ruta de la imagen del jugador
import imageData from '../../../api/images';
import LoadingComponent from "../../components/LoadingComponent";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PlayerCard = ({ item }) => {
    //Constantes para el manejo de la imagen
    const [imagenUrl, setImagenUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //Metodo para cargar la imagen y manejar el error en caso de que no se encuentren
        const cargarImagen = async () => {
            try {
                //Traer la imagen y aplicarla a la url
                const uri = await imageData('jugadores', item.image);
                setImagenUrl(uri);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        cargarImagen();
    }, [item.image]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <LoadingComponent />
            </View>
        );
    }

    if (error) {
        return <Text>Error al cargar la imagen</Text>;
    }

    return (
        <View style={styles.card}>
            <Image source={{ uri: imagenUrl }} style={styles.playerImage} />
            <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.playerPosition}>{item.position}</Text>
            </View>
            <View style={styles.playerNumberContainer}>
                <Text style={styles.playerNumber}>{item.number}</Text>
            </View>
        </View>
    );
};

export default PlayerCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 8,
        borderStartColor: '#020887',
        borderStartWidth: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth * 0.83,
        maxHeight: windowHeight * 0.15, // Asegura una altura mínima
    },
    playerImage: {
        width: windowWidth * 0.18,
        height: windowWidth * 0.18,
        borderRadius: windowWidth * 0.09, // Mitad del ancho para hacerla circular
        backgroundColor: '#f0f0f0', // Color de fondo si la imagen no se carga
    },
    playerInfo: {
        flexDirection: 'column',
        marginLeft: 16,
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
    },
    playerName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        maxWidth: windowWidth * 0.25,
        marginBottom: 4, // Espaciado inferior
    },
    playerPosition: {
        fontSize: 11,
        color: '#777',
    },
    playerNumberContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: windowWidth * 0.15,
    },
    playerNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
});