import {Col, If} from "@/src/shared/components";
import {useSoccerSectionStore} from "@/src/matches/stores/soccerSectionStore";
import {useEffect, useRef} from "react";
import {FlashList} from "@shopify/flash-list";
import {League, Matche} from "@/src/shared/models";
import {Image, RefreshControl, Text, TouchableOpacity, ViewProps} from "react-native";
import {useHttpQueryStore} from "@/src/matches/stores/httpQueryStore";
import {Skeleton} from "@/src/shared/components/Skeleton";
import {LiveSoccerModal} from "@/src/matches/components/LiveSoccerModal";
import {SectionHeader, SectionItems} from "@/src/matches/components/SectionItems";
import {useLiveSoccerModalStore} from "@/src/matches/stores/liveSoccerModalStore";


export function SoccerSection() {
    const {getLiveMatches, liveMatches, liveMatchesSectionList, loading} = useSoccerSectionStore(state => state)
    const {query} = useHttpQueryStore(state => state);

    const flatListRef = useRef(null);

    const {open} = useLiveSoccerModalStore()

    const scrollToIndex = (index) => {
        flatListRef.current.scrollToIndex({animated: true, index});
    };

    useEffect(() => {
        getLiveMatches(query)
    }, [query]);


    return (
        <Col styleClass="flex-1">
        <FlashList
            data={liveMatchesSectionList.value}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
                if (League.isInstance(item)) return <SectionHeader league={item}/>

                return <SectionItems matche={item}/>
            }}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getLiveMatches(query)}/>}
            keyExtractor={item => item.id.value}
            estimatedItemSize={200}
            getItemType={item => League.isInstance(item) ? 'sectionHeader' : 'row'}
        />

                <LiveSoccerModal />


    </Col>)


}