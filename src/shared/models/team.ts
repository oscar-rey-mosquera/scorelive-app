import {StringVO} from "@/src/shared/models/stringVO";
import {IdVO} from "@/src/shared/models/idVO";

export class Team {
    public id = IdVO.new()
    public name : StringVO
    public image = StringVO.new()
    public teamId : IdVO


    constructor(
        {
            teamId = IdVO.new(),
            name = StringVO.new()
        }
        : {
            name?: StringVO,
            teamId?: IdVO
        }
    ) {
        this.teamId = teamId
        this.name = name
    }

    public static empty () {
        return new Team({})
    }


    public getImage() {
        return `https://cdn.resfu.com/img_data/escudos/medium/${this.teamId.value}.jpg?size=60x&lossy=1`
    }

    public toJSON() {

        return {
            teamId: this.teamId.value,
            name: this.name.value
        }
    }


}