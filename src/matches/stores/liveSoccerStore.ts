import {create} from 'zustand'
import {ArrayVO, HttpQuery, League, Matche, NumberVO} from "@/src/shared/models";
import {liveMatch, liveMatchCount} from "@/src/matches/repositories/liveMatch";



export interface LiveSoccerStoreStateInterface {
    liveMatches: ArrayVO<League>,
    liveMatchesCount : NumberVO,
    liveMatchesSectionList: ArrayVO<League | Matche>
}

export interface LiveSoccerStoreInterface extends LiveSoccerStoreStateInterface {
    getLiveMatches: () => Promise<void>
}

const initialState: LiveSoccerStoreStateInterface = {
    liveMatches : new ArrayVO<League>([]),
    liveMatchesCount : NumberVO.new(0),
    liveMatchesSectionList : new ArrayVO<League | Matche>([])
}

export const useLiveSoccerStore = create<LiveSoccerStoreInterface>((set, get) => ({
    ...initialState,
    getLiveMatches: async () => {

        const liveMatchesCount = await liveMatchCount()

        const liveMatches = await liveMatch()

        const liveMatchesSectionListNew = []

        liveMatches.value.forEach(league => liveMatchesSectionListNew.push(...league.mergeLeagueAndMatches().value))

        set({liveMatches, liveMatchesCount, liveMatchesSectionList : new ArrayVO<League | Matche>(liveMatchesSectionListNew)})
    }
}))



