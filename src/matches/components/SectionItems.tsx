import {Card, Col, PrimaryText, Row, SecondaryText, If} from "@/src/shared/components";
import {Image, Text, TouchableOpacity, ViewProps} from "react-native";
import {League, Matche} from "@/src/shared/models";
import {Skeleton} from "@/src/shared/components/Skeleton";
import {router} from "expo-router";
import {useLiveSoccerModalStore} from "@/src/matches/stores/liveSoccerModalStore";



interface SectionHeaderProps extends ViewProps {
    league?: League
}

interface SectionItemProps extends ViewProps {
    matche: Matche
    styleClass?: string
}

export function SectionHeader({league}: SectionHeaderProps) {
    return (
        <Row className="mt-2">
            <Image
                source={{uri: league?.image.value}}
                className="w-5 h-5 mr-2 rounded-2xl"
            />

            <SecondaryText>{league?.name.value}</SecondaryText>
        </Row>
    )
}

export function LoadingSectionItem() {
    return (
        <Col>
            <Row className="mt-2 items-center">
                <Card className="w-5 h-5 mr-2 rounded-2xl"/>
                <Card className="w-40 h-3 mr-2"/>
            </Row>
            {
                [1, 2, 3].map((item, index) => {
                    return <Card styleClass="py-3 px-4 rounded mt-2" key={index}>
                        <Col>
                            <Row styleClass="justify-between mb-2 items-center">
                                <Row styleClass="flex-1">
                                    <Skeleton className="w-5 h-5 mr-2 rounded-2xl"/>
                                    <Skeleton className="w-40 h-3 mr-2"/>
                                </Row>
                                <Skeleton className="w-5 h-5 mr-2 rounded-2xl"/>
                            </Row>
                            <Row styleClass="justify-between items-center">
                                <Row styleClass="flex-1">
                                    <Skeleton className="w-5 h-5 mr-2 rounded-2xl"/>
                                    <Skeleton className="w-40 h-3 mr-2"/>
                                </Row>
                                <Skeleton className="w-5 h-5 mr-2 rounded-2xl"/>
                            </Row>
                        </Col>
                    </Card>
                })
            }
        </Col>
    )
}


export function SectionItems({matche, styleClass}: SectionItemProps) {

    const {close} = useLiveSoccerModalStore()

    function onPress() {
        close()
        router.push('/main/stacks/matches-detail')
    }

    return (
        <TouchableOpacity onPress={() =>  onPress()}>
            <Card styleClass={`py-3 px-4 rounded mt-2 ${styleClass}`}>
                <Row>
                    <Col styleClass="justify-center align-center items-center mr-3">
                        <If condition={matche.isToStart() || matche.isFinished()}>
                            <SecondaryText>FT</SecondaryText>
                            <SecondaryText>{matche.date.getDay()}/{matche.date.getMonth()}</SecondaryText>
                        </If>
                        <If condition={matche.isBreak()}>
                            <Row styleClass="onlive-bg px-2 py-1 rounded-md">
                                <Text>DES</Text>
                            </Row>
                        </If>
                        <If condition={matche.hasTime()}>
                            <Row styleClass="onlive-bg px-2 py-1 rounded-md">
                                <Text>{matche.time?.value}'</Text>
                            </Row>
                        </If>
                    </Col>
                    <Col styleClass="flex-1">
                        <Row styleClass="justify-between mb-2">
                            <Row styleClass="flex-1">
                                <Image
                                    source={{uri: matche.teamOne.getImage()}}
                                    className="w-5 h-5 mr-2 rounded-2xl"
                                />
                                <SecondaryText>{matche.teamOne.name.value}</SecondaryText>
                            </Row>
                            <PrimaryText styleClass="text-center">{matche.getTeamOneMarker().value}</PrimaryText>
                        </Row>
                        <Row styleClass="justify-between">
                            <Row styleClass="flex-1">
                                <Image
                                    source={{uri: matche.teamTwo.getImage()}}
                                    className="w-5 h-5 mr-2 rounded-2xl"
                                />
                                <SecondaryText>{matche.teamTwo.name.value}</SecondaryText>
                            </Row>
                            <PrimaryText styleClass="text-center">{matche.getTeamTwoMarker().value}</PrimaryText>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </TouchableOpacity>
    )
}