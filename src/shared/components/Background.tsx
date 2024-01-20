import {View, ViewProps} from "react-native";
import {useTheme} from "@/src/shared/hooks";

export  interface BackgroundProps extends ViewProps {
    styleClass?: string
}


export function Background({children, styleClass, ...props}: BackgroundProps) {
    return <View
        style={{backgroundColor: useTheme().background}}
        className={`flex-1 ${styleClass}`}
        {...props}
    >
        {children}
    </View>;
}