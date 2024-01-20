import {Col, PrimaryText, Row, SafeArea, If} from "@/src/shared/components";
import {Card} from "@/src/shared/components/Card";
import {Text, TouchableOpacity, View} from "react-native";
import {SportCategoryList} from "@/src/matches/components/SportCategoryList";
import {CalendarStrip} from "@/src/matches/components/CalendarStrip";
import {useHttpQueryStore} from "@/src/matches/stores/httpQueryStore";
import {useLiveSoccerModalStore} from "@/src/matches/stores/liveSoccerModalStore";
import i18n from "@/src/shared/languages";
import {useSportCategoryStore} from "@/src/matches/stores/sportCategoryStore";
import {useLiveSoccerStore} from "@/src/matches/stores/liveSoccerStore";


export function Header() {
    const {query, setHttpQuery} = useHttpQueryStore(state => state)
    const {toggleOpen} = useLiveSoccerModalStore()

    const { liveMatchesCount } = useLiveSoccerStore()

    const {selectedSportCategory} = useSportCategoryStore()

    return (
        <Card>
            <SafeArea>
                <Col styleClass="px-5 pb-3">
                    <Row styleClass="justify-between">
                        <Row>
                            <PrimaryText styleClass="text-2xl font-medium">score</PrimaryText>
                            <PrimaryText styleClass="text-2xl font-medium pink-color">live</PrimaryText>
                        </Row>
                        <If condition={selectedSportCategory === 'soccer'}>
                            <TouchableOpacity onPress={toggleOpen}>
                                <Row styleClass="onlive-bg px-2 py-1 rounded-md">
                                    <Text>{i18n.t('live')} ({liveMatchesCount.value})</Text>
                                </Row>
                            </TouchableOpacity>
                        </If>
                    </Row>
                    <Row styleClass="mt-3">
                        <SportCategoryList/>
                    </Row>

                    <CalendarStrip
                        selectedDate={query.date}
                        onDateSelected={date => setHttpQuery(query.setDate(date).newHttpQuery())}
                    />
                </Col>
            </SafeArea>
        </Card>
    )

}
