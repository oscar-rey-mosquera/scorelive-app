import betSoccerHttp from "@/src/shared/libs/beSoccerHttp";
import {AxiosResponse} from "axios";
import {NumberVO} from "@/src/shared/models/numberVO";
import {ArrayVO, HttpQuery, IdVO, League, StringVO, Matche, DateVO, Team} from "@/src/shared/models";


export interface LiveResponse {
    ads: Ads;
    ads_config: AdsConfig[];
    main_news: MainNews;
    competitions: Competition[];
    trending: Trending;
    last_change_datetime: number;
}

export interface Ads {
    normal: number[];
    big: any[];
}

export interface AdsConfig {
    section_id: null | string;
    type: string;
    position: number;
}

export interface Competition {
    id: string;
    y: string;
    n: string;
    c_w: number;
    lv: string;
    cc: string;
    t?: string;
    g: string;
    tg: string;
    image: string;
    k: string;
    mt: MT[];
    nw?: MainNews;
}

export interface MT {
    id: string;
    l: string;
    v: string;
    y: string;
    k: string;
    lid: string;
    vid: string;
    s: number;
    ld: string;
    trend: boolean;
    full_date: FullDate;
    r?: string;
    lmin?: string;
    tv?: Tv[];
    w?: number;
    t?: string;
    rc?: number;
    hp?: boolean;
}

export enum FullDate {
    The13012024 = "13/01/2024",
    The14012024 = "14/01/2024",
}

export interface Tv {
    id: string;
    name: string;
}

export interface MainNews {
    id: string;
    title: string;
    img: string;
}

export interface Trending {
    matches: any[];
    trends: any[];
}


class Adapter {
    public static dataToLeague(response: Competition): League {
        const league = new League(
            {
                leagueId: IdVO.new(response.id),
                year: StringVO.new(response.y),
                name: StringVO.new(response.n),
                baking: response.t ? StringVO.new(response.t) : StringVO.new(),
                image: StringVO.new(response.image)
            }
        )

        league.setMatches(new ArrayVO<Matche>(response.mt.map(Adapter.dataToMatch)))

        return league
    }

    public static dataToMatch(response: MT): Matche {

        const teamOne = new Team(
            {
                teamId: IdVO.new(response.lid),
                name: StringVO.new(response.l),
            }
        )

        const teamTwo = new Team(
            {
                teamId: IdVO.new(response.vid),
                name: StringVO.new(response.v)
            }
        )


        return new Matche(
            {
                matcheId: IdVO.new(response.id),
                year: StringVO.new(response.y),
                date: DateVO.new(`${response.full_date} ${response.ld}`, "DD/MM/YYYY HH:mm"),
                status: StringVO.new(response.s ? response.s.toString() : "-1"),
                marker: response.r ? StringVO.new(response.r) : StringVO.new('0 - 0'),
                teamOne,
                teamTwo,
                winningTeam: response.w ? response.w === 1 ? teamOne : teamTwo : null,
            }
        )
    }
}

export async function liveMatchCount() {
    try {
        const response = await betSoccerHttp.get('/scripts/api/api.php?&key=b3fcd6725e03f4e5d588f6624cac5522&format=json&site=ResultadosAndroid&req=live_matches') as AxiosResponse<{
            total: number
        }>
        return NumberVO.new(response.data.total)
    } catch (e) {
        return NumberVO.new()
    }
}

export async function liveMatch() {
    try {
        const response  = await betSoccerHttp.get(`/scripts/api/api.php?&key=b3fcd6725e03f4e5d588f6624cac5522&format=json&site=ResultadosAndroid&req=home_matches&locale=24&date=${DateVO.new().YYYYMMDD()}&extra=480&filter=live&lang=es&isocode=co&vr=8`) as AxiosResponse<LiveResponse>
        return new ArrayVO<League>(response.data.competitions.map(Adapter.dataToLeague))
    } catch (e) {
        return new ArrayVO<League>([])
    }
}

export async function liveMatchHistory(query: HttpQuery) {
    try {
        const response = await betSoccerHttp.get(`/scripts/api/api.php?&key=b3fcd6725e03f4e5d588f6624cac5522&format=json&site=ResultadosAndroid&req=home_matches&locale=24&date=${query.YYYYMMDD()}&extra=480&lang=es&isocode=co&vr=8`) as AxiosResponse<LiveResponse>

        return new ArrayVO<League>(response.data.competitions.map(Adapter.dataToLeague))

    } catch (e) {
        return new ArrayVO<League>([])
    }
}

