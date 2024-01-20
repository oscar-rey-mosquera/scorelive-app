
import {Dimensions, View, ViewProps} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet/src";
import {useCallback, useEffect, useMemo, useRef} from "react";
import {useLiveSoccerModalStore} from "@/src/matches/stores/liveSoccerModalStore";
import {useHttpState, useTheme} from "@/src/shared/hooks";
import {useLiveSoccerStore} from "@/src/matches/stores/liveSoccerStore";
import {League} from "@/src/shared/models";
import {FlashList} from "@shopify/flash-list";
import {SectionHeader, SectionItems} from "@/src/matches/components/SectionItems";
import { ScrollView } from 'react-native-gesture-handler';



export interface LiveSoccerModal extends ViewProps {

}




export function LiveSoccerModal(props: LiveSoccerModal) {

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const {open, toggleOpen, reset} = useLiveSoccerModalStore()

    // variables
    const snapPoints = useMemo(() => ['25%', '100%'], []);

    const { getLiveMatches, liveMatchesSectionList } = useLiveSoccerStore()

    const {loading} = useHttpState([getLiveMatches])


     useEffect(() => {
         if (!open) return
         bottomSheetRef.current.expand()

         return () => {
             reset()
         };
     }, [open])

    const handleSheetChanges = useCallback((index: number) => {
        if(index < 0) toggleOpen()
    }, []);

    return (
        <BottomSheet
            backgroundStyle={{backgroundColor : useTheme().modalColor}}
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onChange={handleSheetChanges}
        >
            <ScrollView>
            <View style={{ minHeight:  200  }} className="px-4 flex-1">
                <FlashList
                    data={liveMatchesSectionList.value}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                        if (League.isInstance(item)) return <SectionHeader league={item}/>

                        return <SectionItems matche={item} styleClass="shadow-2xl"/>
                    }}
                    keyExtractor={item => item.id.value}
                    estimatedItemSize={200}
                    getItemType={item => League.isInstance(item) ? 'sectionHeader' : 'row'}
                />
            </View>
            </ScrollView>

        </BottomSheet>
    )
}
