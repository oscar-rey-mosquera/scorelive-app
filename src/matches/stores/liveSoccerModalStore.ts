import {create} from 'zustand'



export interface LiveSoccerModalStateInterface {
    open: boolean
}

export interface HttpQueryStoreInterface extends LiveSoccerModalStateInterface {
    toggleOpen: () => void,
    reset : () => void
}

const initialState: LiveSoccerModalStateInterface = {
    open : false
}

export const useLiveSoccerModalStore = create<HttpQueryStoreInterface>((set, get) => ({
    ...initialState,
    toggleOpen: () => set({open : !get().open}),
    reset : () => set({...initialState})
}))



