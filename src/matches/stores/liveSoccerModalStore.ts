import {create} from 'zustand'



export interface LiveSoccerModalStateInterface {
    open: boolean
}

export interface HttpQueryStoreInterface extends LiveSoccerModalStateInterface {
    toggle: () => void,
    reset : () => void,
    close : () => void
}

const initialState: LiveSoccerModalStateInterface = {
    open : false
}

export const useLiveSoccerModalStore = create<HttpQueryStoreInterface>((set, get) => ({
    ...initialState,
    toggle: () => set({open : !get().open}),
    reset : () => set({...initialState}),
    close : () => set({open : false})
}))



