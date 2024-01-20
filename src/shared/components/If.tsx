import {View, ViewProps} from "react-native";


export interface IfProps extends ViewProps {
    condition: boolean
}
export function If({condition, children}: IfProps) {
    if (!condition) return null
    return children
}