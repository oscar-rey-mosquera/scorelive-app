import {View, ViewProps} from "react-native";
import {useTheme} from "@/src/shared/hooks";



export interface SkeletonProps extends ViewProps {
    styleClass?: string
}
export function Skeleton({styleClass, ...props}: SkeletonProps) {
    const {themeMode} = useTheme()

    return <View
        {...props}
    className={`${themeMode}-primary-bg ${styleClass}`}
>
    {props.children}
    </View>;
}