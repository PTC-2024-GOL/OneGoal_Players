import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";
import Fonts from "../../../fonts/fonts";
import {useCallback, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import fetchData from "../../../api/components";
import {ToastNotification} from "../Alerts/AlertComponent";

const Mood = ({mood, idParticipation}) => {
    Fonts();
    //API que hace llamada al servicio de participaciones partido
    const PARTICIPATION_API = 'services/players/participaciones_partidos.php';
    //Variable que maneja la carta que ha sido seleccionada.
    const [selectedCard, setSelectedCard] = useState(null);
    //Variable que maneja el cambio de botones y el disable de las cartas.
    const [isUpdated, setIsUpdated] = useState(false);
    //Variable que guarda el estado de animo que han seleccionado
    const [emotion, setEmotion] = useState('');
    //Varibale que permitirá guardar texto
    const [text, setText] = useState('Haz clíc en el botón de abajo para poder agregar o actualizar tu estado de ánimo.');

    //Funcion que permmite identificar el estado de animo seleccionado y lo guarda en la variable emotion.
    const handleSelectCard = (card) => {
        //Permite que la card se vea seleccionada.
        setSelectedCard(card);
        switch (card) {
            case 1:
                setEmotion('Energetico');
                break;
            case 2:
                setEmotion('Satisfecho');
                break;
            case 3:
                setEmotion('Normal')
                break;
            case 4:
                setEmotion('Agotado')
                break;
            case 5:
                setEmotion('Desanimado')
                break;
        }
    }

    //Funcion que permite actualizar el estado de animo seleccionado por el jugador.
    const update = async () => {
        try {
            const form = new FormData();
            form.append('animo', emotion);
            form.append('idParticipacion', idParticipation);

            const data = await fetchData(PARTICIPATION_API, 'updateMoodRow', form);
            if(data.status){
                //Cuando la peticion viene correcta, entonces se muestra un mensaje de extio y ademas cambios el estado de la variable
                //isUpdated para que vuelva aparecer el boton inicial(Actualiza o agrega tu estado de animo)
                await ToastNotification(1, data.message, true);
                setIsUpdated(false);
                setText('Haz clíc en el botón de abajo para poder agregar o actualizar tu estado de ánimo.')
            }else {
                ToastNotification(2, data.error, true);
            }
        }catch (e){
            ToastNotification(3, 'Ocurrió un error al intentar guardar el estado de ánimo.', true);
        }
    }

    //Se ejecuta cada vez que la variable mood cambie de estado
    useFocusEffect(
        useCallback(()=>{
            //Switch que guarda en la variable number el tipo de animo que viene desde la base.
            let number;
            switch (mood) {
                case 'Desanimado':
                    number = 5;
                    break;
                case 'Agotado':
                    number = 4;
                    break;
                case 'Normal':
                    number = 3;
                    break;
                case 'Satisfecho':
                    number = 2;
                    break;
                case 'Energetico':
                    number = 1;
                    break;
            }
            //Muestra la carta seleccionada del estado de animo que viene desde la base.
            handleSelectCard(number)
        },[mood])
    )

    //Funcion que cambia el estado de la variable isUpdated, esto para que el boton cambie a Guardar.
    const openSave = () => {
        setIsUpdated(true);
        setText('Selecciona el emoji con el que te sentiste identificado.');
    };

    return(
            <View>
                <Text style={styles.question}>¿Cómo te sentiste después del partido?</Text>
                <Text style={styles.text1}>{text}</Text>
                <View style={styles.row}>
                    <ScrollView horizontal={true}>
                        {/*Al darle clic a una carta esta mandara a llamar a la funcion handleSelectCard, esto para que se pueda ver*/}
                        {/*en diseño la carta seleccionada, ademas verifica si el estado de la variable isUpdated es diferente a true, de */}
                        {/*ser asi entonces se desabilita*/}
                        <TouchableOpacity onPress={()=>{handleSelectCard(1)}} disabled={!isUpdated}>
                            {/*Verifica si selectedCard es igual al numero que menciona y si es asi, se selecciona la carta*/}
                            <View style={[styles.card, styles.card1, selectedCard === 1 && styles.selectedCard]}>
                                <Image style={styles.img} source={require('../../../assets/emotions/1.png')}/>
                                <Text style={styles.emotion}>Energético</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{handleSelectCard(2)}} disabled={!isUpdated}>
                            <View style={[styles.card, styles.card2, selectedCard === 2 && styles.selectedCard]}>
                                <Image style={styles.img} source={require('../../../assets/emotions/2.png')}/>
                                <Text style={styles.emotion}>Satisfecho</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{handleSelectCard(3)}} disabled={!isUpdated}>
                            <View style={[styles.card, styles.card3, selectedCard === 3 && styles.selectedCard]}>
                                <Image style={styles.img} source={require('../../../assets/emotions/3.png')}/>
                                <Text style={styles.emotion}>Normal</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.row2}>
                    <TouchableOpacity onPress={()=>{handleSelectCard(4)}} disabled={!isUpdated}>
                        <View style={[styles.card, styles.card4, selectedCard === 4 && styles.selectedCard]}>
                            <Image style={styles.img} source={require('../../../assets/emotions/4.png')}/>
                            <Text style={styles.emotion}>Agotado</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{handleSelectCard(5)}} disabled={!isUpdated}>
                        <View style={[styles.card, styles.card5, selectedCard === 5 && styles.selectedCard]}>
                            <Image style={styles.img} source={require('../../../assets/emotions/5.png')}/>
                            <Text style={styles.emotion}>Desanimado</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Botón cambia basado en el estado isUpdated */}
                {isUpdated ? (
                    <TouchableOpacity onPress={update}>
                        <Text style={styles.button1}>Guardar</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={openSave}>
                        <Text style={styles.button1}>Agrega tu estado de ánimo</Text>
                    </TouchableOpacity>
                )}
            </View>
    )
}

const styles = StyleSheet.create({
    question: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18
    },
    text1: {
        fontFamily: 'Poppins_300Light',
        marginBottom: 15
    },
    row: {
        flexDirection: "row",
        gap:9,
        justifyContent: "center"
    },
    row2: {
        marginTop: 10,
        flexDirection: "row",
        gap: 9,
        alignItems: "center",
        marginBottom: 25
    },
    card1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fbda4c',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    card2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fb8dbb',
        padding: 10,
        width: 100,
        borderRadius: 10,
        marginHorizontal: 10
    },
    card3: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f1c7f4',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    card4: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#aaead6',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    card5: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#bad7f8',
        padding: 10,
        width: 100,
        borderRadius: 10
    },
    emotion: {
        fontFamily: 'Poppins_300Light',
        fontSize: 12,
        marginTop: -10
    },
    img: {
        width: 100,
        height: 80,
    },
    selectedCard: {
        borderColor: '#777575',
        borderWidth: 2,
    },
    button1: {
        backgroundColor: '#adf1a4',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
        textAlign: "center",
        fontFamily: 'Poppins_500Medium'
    }
})
export default Mood;