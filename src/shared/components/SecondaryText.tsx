import {Text, ViewProps} from "react-native";
import {useTheme} from "@/src/shared/hooks";

export interface SecondaryTextProps extends ViewProps {
    styleClass?: string
}

export function SecondaryText({children, styleClass}: SecondaryTextProps) {
    const {themeMode} = useTheme()
    return <Text
        className={`${themeMode}-secondary-text ${styleClass}`}
       >
        {children}
    </Text>;
}