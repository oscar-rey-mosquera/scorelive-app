import {StringVO} from "@/src/shared/models/stringVO";
import {IdVO} from "@/src/shared/models/idVO";
import {Team} from "@/src/shared/models/team";
import {DateVO} from "@/src/shared/models/dateVO";
import {NumberVO} from "@/src/shared/models/numberVO";

export class Matche {

    public id = IdVO.new()
    public teamOne : Team
    public teamTwo : Team
    public winningTeam : Team|null
    public year : StringVO
    public date : DateVO
    public status : StringVO
    public maker : StringVO
    public matcheId : IdVO
    public marker : StringVO
    public time : NumberVO|null

    constructor({
                    matcheId = IdVO.new(),
                    teamOne = Team.empty(),
                    teamTwo = Team.empty(),
                    winningTeam = null,
                    year = StringVO.new(),
                    date = DateVO.new(),
                    status = StringVO.new(),
                    marker = StringVO.new(),
                    time = null
                } : {
                    matcheId?: IdVO,
                    teamOne?: Team,
                    teamTwo?: Team,
                    winningTeam?: Team | null,
                    year?: StringVO,
                    date?: DateVO,
                    status?: StringVO,
                    marker?: StringVO,
                    time?: NumberVO | null
                }
                ) {

        this.teamOne = teamOne
        this.teamTwo = teamTwo
        this.winningTeam = winningTeam
        this.year = year
        this.date = date
        this.status = status
        this.marker = marker
        this.matcheId = matcheId
        this.time = time
    }

    public toJSON() {

        return {
            matcheId: this.matcheId.value,
            teamOne: this.teamOne.toJSON(),
            teamTwo: this.teamTwo.toJSON(),
            winningTeam: this.winningTeam?.toJSON(),
            year: this.year.value,
            date: this.date.value,
            status: this.status.value,
            maker: this.maker.value
        }
    }

    public isFinished() {

        return this.status.parseInt().equals(NumberVO.new(1))
    }

    public isBreak() {
        return this.status.parseInt().equals(NumberVO.new(5))
    }

    public isPlaying() {

        return this.isBreak() || this.status.parseInt().equals(NumberVO.new(0))
    }

    public hasTime() {

        return this.time !== null
    }

    public isToStart() {
        return this.status.parseInt().lessThan(NumberVO.new(0)) || this.isPostponed()
    }

    public isPostponed() {
        return this.status.parseInt().equals(NumberVO.new(2))
    }



    public getTeamOneMarker()  {
        let marker = this.marker.removeSpace().split('-').first()
            ? StringVO.new(this.marker.removeSpace().split('-').first())
            : StringVO.new('0')

        marker = marker.includes('(')
            ? StringVO.new(`${marker.split('(').first()}(${marker.split('(').last()})` )
            : marker

        return marker
    }

    public getTeamTwoMarker()  {

        let marker = this.marker.removeSpace().split('-').last()
            ? StringVO.new(this.marker.removeSpace().split('-').last())
            : StringVO.new('0')

       marker = marker.includes(')')
           ? StringVO.new(`${marker.split(')').last()}(${marker.split(')').first()})` )
            : marker

        return marker

    }
}