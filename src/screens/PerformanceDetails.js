import {View, Text, StyleSheet} from "react-native";

const PerformanceDetails = () => {
    return(
        <View style={styles.container}>
            <Text>Detalles de rendimeinto en este partido</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default PerformanceDetails;