import {Button, Modal, RefreshControl, View, ViewProps} from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import {useCallback, useEffect, useMemo, useRef} from "react";
import {useLiveSoccerModalStore} from "@/src/matches/stores/liveSoccerModalStore";
import {useHttpState, useTheme} from "@/src/shared/hooks";
import {useLiveSoccerStore} from "@/src/matches/stores/liveSoccerStore";
import {League} from "@/src/shared/models";
import {FlashList} from "@shopify/flash-list";
import {SectionHeader, SectionItems} from "@/src/matches/components/SectionItems";
import {Col, If, Background} from '@/src/shared/components'
import {primaryColor} from "@/constants/Colors";
import i18n from "@/src/shared/languages";



export interface LiveSoccerModal extends ViewProps {

}


export function LiveSoccerModal(props: LiveSoccerModal) {

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const {open, toggle, close} = useLiveSoccerModalStore()

    // variables
    const snapPoints = useMemo(() => ['25%', '100%'], []);

    const {getLiveMatches, liveMatchesSectionList} = useLiveSoccerStore()

    const {loading, http} = useHttpState([getLiveMatches])


    return (
        <Modal
            animationType={'slide'}
            visible={open}
        >
            <Background styleClass="px-4 pb-4 min-h-12 flex-1">
                    <FlashList
                        data={liveMatchesSectionList.value}
                        showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => http()}/>}
                        renderItem={({item}) => {
                            return League.isInstance(item) ?
                                <If condition={item.hasMatchesInLive()}>
                                    <SectionHeader league={item}/>
                                </If>
                                :
                                <If condition={item.isPlaying()}>
                                    <SectionItems matche={item} styleClass="shadow-2xl"/>
                                </If>
                        }}
                        keyExtractor={item => item.id.value}
                        estimatedItemSize={200}
                        getItemType={item => League.isInstance(item) ? 'sectionHeader' : 'row'}
                        extraData={open}
                    />
                </Background>
                <Button title={i18n.t('close')} onPress={toggle} color={primaryColor}/>
        </Modal>
    )
}
