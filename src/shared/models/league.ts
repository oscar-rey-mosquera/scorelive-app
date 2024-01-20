import {IdVO} from "@/src/shared/models/idVO";
import {StringVO} from "@/src/shared/models/stringVO";
import {Matche} from "@/src/shared/models/matche";
import {ArrayVO} from "@/src/shared/models/arrayVO";

export interface LeagueSectionList {title : League, data : Matche[]}

export class League {

    public id = IdVO.new()
    public leagueId
    public year
    public name
    public baking
    public image
    public  matches : ArrayVO<Matche> = new ArrayVO<Matche>([])

    constructor(
        {
            leagueId = IdVO.new(),
            year = StringVO.new(),
            name = StringVO.new(),
            baking = StringVO.new(),
            image = StringVO.new()
        }
        : {
            leagueId: IdVO,
            year: StringVO,
            name: StringVO,
            baking: StringVO,
            image: StringVO
        }
    ) {
        this.leagueId = leagueId
        this.year = year
        this.name = name
        this.baking = baking
        this.image = image
    }

    public setMatches(matches : ArrayVO<Matche>)  {
        this.matches = matches
    }

    mergeLeagueAndMatches() : ArrayVO<League | Matche> {

        return new ArrayVO<League | Matche>([this, ...this.matches.value])
    }

    sectionListFormat() : LeagueSectionList {
        return {
            data : this.matches.value,
            title : this
        }
    }

    public hasMatchesInLive() : boolean  {

        return this.matches.value.some(e => e.isPlaying())
    }

    public toJSON() {

        return {
            leagueId: this.leagueId.value,
            year: this.year.value,
            name: this.name.value,
            baking: this.baking.value,
            image: this.image.value,
            matches: this.matches.value.map(e => e.toJSON())
        }
    }

   public static isInstance(otherClass) : boolean {

        return otherClass instanceof League
    }

}