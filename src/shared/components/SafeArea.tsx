import {View, ViewProps} from "react-native";
import {useTheme} from "@/src/shared/hooks";
import {useSafeAreaInsets} from "react-native-safe-area-context";


export function SafeArea({children, ...props}: ViewProps) {
    const insets = useSafeAreaInsets()
    return <View
        {...props}
        style={{paddingTop: insets.top}}
    >
        {children}
    </View>;
}