import {View, ViewProps} from "react-native";
import {useTheme} from "@/src/shared/hooks";


export function Background({children, ...props}: ViewProps) {
    return <View
        style={{backgroundColor: useTheme().background, flex: 1}}
        {...props}
    >
        {children}
    </View>;
}