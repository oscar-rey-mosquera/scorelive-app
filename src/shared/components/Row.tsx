import {View, ViewProps} from "react-native";
import {useTheme} from "@/src/shared/hooks";

export interface RowProps extends ViewProps {
    styleClass?: string
}
export function Row({styleClass, ...props}: RowProps) {
    return <View
        className={`flex flex-row ${styleClass}`}
        {...props}
    >
        {props.children}
    </View>;
}