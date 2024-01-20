import {FlashList} from "@shopify/flash-list";
import {Card, PrimaryText, Row} from "@/src/shared/components";
import {TouchableOpacity, ViewProps, Image} from "react-native";
import {SportCategory, useSportCategoryStore} from "@/src/matches/stores/sportCategoryStore";
import {useTheme} from "@/src/shared/hooks";


export interface SportCategoryItemProps extends ViewProps {
    item : SportCategory
}




export function SportCategoryList() {

    const sportCategories = useSportCategoryStore(state => state.sportCategories);

    const selectedSportCategory = useSportCategoryStore(state => state.selectedSportCategory);

    const setSelectedSportCategory = useSportCategoryStore(state => state.setSelectedSportCategory);

    const {themeMode} = useTheme()


     function SportCategoryItem({item} : SportCategoryItemProps) {

        const selectedColor = selectedSportCategory === item.id ? 'pink-bg' : ''

         const selectedColorText = selectedSportCategory === item.id ? 'text-white' : ''

        return (
            <TouchableOpacity onPress={() =>  setSelectedSportCategory(item.id)}>
               <Card className={`py-2 px-3 rounded-lg mr-3 ${themeMode}-primary-bg ${selectedColor}`}>
                   <Row>
                       <Image source={item.image} className="w-5 h-5 mr-2"/>
                       <PrimaryText styleClass={`${selectedColorText}`}>{item.title}</PrimaryText>
                   </Row>
               </Card>
            </TouchableOpacity>
        )
    }

    return (
        <FlashList
            horizontal={true}
            data={sportCategories}
            renderItem={({item}) => <SportCategoryItem item={item} />}
            estimatedItemSize={200}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            extraData={selectedSportCategory}
        />
    )
}
