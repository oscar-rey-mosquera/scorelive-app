import {Text, ViewProps} from "react-native";
import {useTheme} from "@/src/shared/hooks";
import '@/src/shared/styles'

export interface PrimaryTextProps extends ViewProps {
    styleClass?: string
}

export function PrimaryText({children, styleClass}: PrimaryTextProps) {
    const {themeMode} = useTheme()
    return <Text
        className={`${themeMode}-primary-text ${styleClass}`}
    >
        {children}
    </Text>;
}





