//Importamos las fuentes a utilizar
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold} from "@expo-google-fonts/poppins";

const Fonts = () => {
    //Colocamos las fuentes que vamos a utilizar
    const [fontsLoaded] = useFonts({
        Poppins_600SemiBold_Italic,
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

};

export default Fonts;