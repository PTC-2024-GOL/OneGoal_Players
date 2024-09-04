import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import soccer from '../../../assets/Player-soccer.png';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const JourneyCard = ({ journey, onPressTraining, onPressRatings }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.journeyTitle}>{journey.title}</Text>
            <Text style={styles.journeyDuration}>{journey.duration}</Text>
            <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.line} onPress={() => onPressTraining(journey.id)}>
                    <View style={styles.actionButton}>
                        <Image source={soccer}></Image>
                    </View>
                    <Text style={styles.actionText}>Entrenamientos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.line} onPress={() => onPressRatings(journey.id)}>
                    <View style={[styles.actionButton, styles.actionButtonPurple]}>
                        <FontAwesome name="pencil" size={18} color="white" />
                    </View>
                    <Text style={styles.actionText}>Calificaciones</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default JourneyCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        borderStartColor: '#020887',
        borderStartWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    journeyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    journeyDuration: {
        fontSize: 14,
        color: '#777',
        marginVertical: 5,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: '#5AE107',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    actionButtonPurple: {
        backgroundColor: '#5209B0',
    },
    actionText: {
        color: '#000',
        fontSize: 14,
        marginHorizontal: 5,
        maxWidth: windowWidth * 0.25,
        textAlign: 'center',
    },
    line: {
        alignItems: 'center',
    },
});
