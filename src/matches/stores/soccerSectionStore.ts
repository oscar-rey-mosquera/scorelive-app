import {create} from 'zustand'
import {ArrayVO, HttpQuery, League, Matche} from "@/src/shared/models";
import {liveMatch, liveMatchHistory} from "@/src/matches/repositories/liveMatch";


export interface SoccerSectionStoreStateInterface {
    liveMatches: ArrayVO<League>,
    liveMatchesSectionList: ArrayVO<League | Matche>
    loading : boolean
}

export interface SoccerSectionStoreInterface extends SoccerSectionStoreStateInterface {

    getLiveMatches: (query : HttpQuery) => Promise<void>
}

const initialState: SoccerSectionStoreStateInterface = {
    liveMatches: new ArrayVO<League>([]),
    liveMatchesSectionList: new ArrayVO<League | Matche>([]),
    loading : true
}

export const useSoccerSectionStore = create<SoccerSectionStoreInterface>((set, get) => ({
    ...initialState,
    getLiveMatches: async (query : HttpQuery) => {

       set({loading : true})

        const liveMatches = await liveMatchHistory(query)

        const liveMatchesSectionListNew = []

        liveMatches.value.forEach(league => liveMatchesSectionListNew.push(...league.mergeLeagueAndMatches().value))

        set({liveMatches, liveMatchesSectionList : new ArrayVO<League | Matche>(liveMatchesSectionListNew)})

        set({loading : false})

    }
}))



