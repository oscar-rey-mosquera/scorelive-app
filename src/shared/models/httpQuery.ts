import moment, {Moment} from "moment";

export class HttpQuery {

    constructor(
        public date: Moment | Date = moment(),
    ) {
    }

    public YYYYMMDD() {
        return moment(this.date).format('YYYY-MM-DD');
    }

    public setDate(date: Moment | Date) {
        this.date = date;
        return this;
    }

    public newHttpQuery() {
        return new HttpQuery(this.date);
    }

}