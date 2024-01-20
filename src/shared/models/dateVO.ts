import moment from "moment";
export class DateVO {

    constructor(
        public value: number
    ) {
    }

    public static new(value: string | null = null, format = 'YYYY-MM-DD') {

        return new DateVO(value ?  moment(value, format).unix() : moment().unix());
    }

    public YYYYMMDD() {
        return this.getDateInstance().toISOString().split('T')[0]
    }

    public getDateInstance() {
        return new Date(this.value * 1000);
    }

    public getDay () {
        return this.getDateInstance().getDate();
    }

    public getMonth () {
        return this.getDateInstance().getMonth() + 1;
    }
}