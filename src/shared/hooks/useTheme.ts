import {useColorScheme} from "react-native";
import Colors from "@/constants/Colors";


export  function useTheme() {

    const colorScheme = useColorScheme();

    return {
         ...Colors[colorScheme ?? 'light'],
        themeMode: colorScheme ?? 'light',
    }
}