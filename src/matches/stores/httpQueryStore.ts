import {create} from 'zustand'
import {Moment} from "moment"
import {HttpQuery} from "@/src/shared/models";



export interface HttpQueryStateInterface {
    query: HttpQuery
}

export interface HttpQueryStoreInterface extends HttpQueryStateInterface {

    setHttpQuery: (query: HttpQuery) => void
}

const initialState: HttpQueryStateInterface = {
    query: new HttpQuery(),
}

export const useHttpQueryStore = create<HttpQueryStoreInterface>((set, get) => ({
    ...initialState,
    setHttpQuery: (query: HttpQuery) => set({query})
}))



