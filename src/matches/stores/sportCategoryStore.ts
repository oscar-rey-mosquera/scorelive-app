import {create} from 'zustand'
import i18n from "@/src/shared/languages";

export interface SportCategory {
    id: string
    title: string
    image: string
}

export interface SportCategoryStoreStateInterface {
    sportCategories: SportCategory[]
    selectedSportCategory: string
}

export interface SportCategoryStoreInterface extends SportCategoryStoreStateInterface {

    setSelectedSportCategory: (sportCategory: string) => void
}

const initialState: SportCategoryStoreStateInterface = {
    selectedSportCategory: 'soccer',
    sportCategories: [
        {
            id: 'soccer',
            title: i18n.t('soccer'),
            image: require('@/assets/images/icons/sports/soccer.png')
        },
        {
            id: 'basketball',
            title: i18n.t('basketball'),
            image: require('@/assets/images/icons/sports/basketball.png')
        }
    ]
}

export const useSportCategoryStore = create<SportCategoryStoreInterface>((set, get) => ({
    ...initialState,
    setSelectedSportCategory: (sportCategory: string) => set({selectedSportCategory: sportCategory}),
}))



