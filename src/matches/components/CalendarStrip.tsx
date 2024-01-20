import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import {primaryColor} from "@/constants/Colors";
import CalendarStripC from 'react-native-calendar-strip';
import {useTheme} from "@/src/shared/hooks";
import React from "react";

export interface CalendarStripProps extends React.ComponentProps<typeof CalendarStripC> {
    style?: StyleProp<ViewStyle>
}


export function CalendarStrip(props: CalendarStripProps) {
    const {text, background} = useTheme()

    return (
        <CalendarStripC
            calendarHeaderPosition={'below'}
            calendarHeaderStyle={{color: text}}
            weekendDateNameStyle={{color: text}}
            dateNumberStyle={{color: text}}
            dateNameStyle={{color: text}}
            weekendDateNumberStyle={{color: text}}
            dayContainerStyle={{...styles.date_container, backgroundColor: background}}
            style={{height: 80}}
            highlightDateContainerStyle={{...styles.date_container, ...styles.selected_color}}
            highlightDateNumberStyle={{color: 'white'}}
            highlightDateNameStyle={{color: 'white'}}
            scrollerPaging={false}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    date_container: {
        borderRadius: 8,
        width: 40,
        height: 50
    },
    selected_color: {
        backgroundColor: primaryColor
    }
});