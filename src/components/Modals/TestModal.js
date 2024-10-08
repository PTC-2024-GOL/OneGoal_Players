import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

const TestModal = ({ modalVisible, setModalVisible }) => {
    const [selectedTest, setSelectedTest] = useState(null);
    const [answers, setAnswers] = useState(Array(9).fill(5)); // Respuestas inicializadas en 5 (medio)

    // Preguntas del test
    const questions = [
        '¿Cómo te sientes físicamente hoy?',
        '¿Cómo te sientes mentalmente hoy?',
        '¿Cómo calificas la calidad de tu sueño la noche pasada?',
        '¿Cómo es tu nivel de energía actual?',
        '¿Tienes alguna molestia o dolor físico hoy?',
        '¿Cómo calificarías tu apetito el día de hoy?',
        '¿Cuánta motivación sientes para entrenar hoy?',
        '¿Sientes alguna rigidez muscular?',
        '¿Cómo sientes tu ánimo en general?',
    ];

    // Lista de tests con fechas
    const availableTests = [
        { id: 1, name: 'Test físico después del entrenamiento', date: '2024-10-05' },
        { id: 2, name: 'Test físico después del partido', date: '2024-10-06' },
    ];

    // Manejar selección de test
    const handleTestSelection = (test) => {
        setSelectedTest(test);
    };

    // Cambiar valor del slider
    const handleSliderChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    // Guardar respuestas del test
    const handleSave = () => {
        console.log('Respuestas guardadas:', answers);
        setModalVisible(false); // Cerrar el modal al guardar
    };

    // Regresar a la lista de tests
    const handleBackToList = () => {
        setSelectedTest(null); // Regresar a la lista de tests
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Botón para cerrar el modal */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    {!selectedTest ? (
                        <ScrollView>
                            <Text style={styles.modalTitle}>Selecciona un Test</Text>
                            {availableTests.map((test) => (
                                <TouchableOpacity 
                                    key={test.id} 
                                    style={styles.testButton} 
                                    onPress={() => handleTestSelection(test)}
                                >
                                    <Text style={styles.testButtonText}>
                                        {test.name} - {test.date}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    ) : (
                        <ScrollView>
                            <Text style={styles.modalTitle}>Test: {selectedTest.name}</Text>
                            {questions.map((question, index) => (
                                <View key={index} style={styles.questionContainer}>
                                    <Text style={styles.questionText}>{question}</Text>
                                    <Slider
                                        style={styles.slider}
                                        minimumValue={1}
                                        maximumValue={10}
                                        step={1}
                                        value={answers[index]}
                                        onValueChange={(value) => handleSliderChange(index, value)}
                                        minimumTrackTintColor="#007bff"
                                        maximumTrackTintColor="#000000"
                                    />
                                    <Text style={styles.sliderValue}>Valor: {answers[index]}</Text>
                                </View>
                            ))}
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Guardar Respuestas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.backButton} onPress={handleBackToList}>
                                <Text style={styles.backButtonText}>Regresar a la Lista de Tests</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ff5c5c',
        padding: 5,
        borderRadius: 15,
        width: 20,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    testButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    testButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 16,
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderValue: {
        textAlign: 'center',
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#ffc107',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TestModal;
