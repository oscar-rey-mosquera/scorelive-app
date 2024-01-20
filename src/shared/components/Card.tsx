import {View, ViewProps} from "react-native";
import {useTheme} from "@/src/shared/hooks";



export interface CardProps extends ViewProps {
    styleClass?: string
}
export function Card({styleClass, ...props}: CardProps) {
    const {themeMode} = useTheme()
    return <View
        {...props}
        className={`${themeMode}-card-bg ${styleClass}`}
    >
        {props.children}
    </View>;
}