import {SoccerSection} from "@/src/matches/components/SoccerSection";
import {useSportCategoryStore} from "@/src/matches/stores/sportCategoryStore";
import {Background} from "@/src/shared/components";
import {BasketBallSection} from "@/src/matches/components/BasketBallSection";


export default function Matches() {
    const selectedSportCategory = useSportCategoryStore(state => state.selectedSportCategory);
     function RenderSportSection({section} : {section : string}) {
        switch(section) {
            case 'soccer':
                return <SoccerSection />
            case 'basketball':
                return <BasketBallSection />
            default:
                return <SoccerSection />
        }
    }

  return (
      <Background className={`px-5 flex flex-col flex-1`}>
          <RenderSportSection section={selectedSportCategory}/>
      </Background>
  );
}

