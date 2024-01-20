import FontAwesome from "@expo/vector-icons/FontAwesome";


export interface IconI extends React.ComponentProps<typeof FontAwesome> {}
export function Icon(props: IconI) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}