import {View, ViewProps} from "react-native";


export interface ColProps extends ViewProps {
    styleClass?: string
}
export function Col({styleClass, ...props}: ColProps) {
    return <View
        className={`flex flex-col ${styleClass}`}
        {...props}
    >
        {props.children}
    </View>;
}