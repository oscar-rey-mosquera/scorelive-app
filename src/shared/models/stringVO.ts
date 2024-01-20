import {ArrayVO} from "@/src/shared/models/arrayVO";
import {NumberVO} from "@/src/shared/models/numberVO";

export class StringVO {

    constructor(
        public value: string
    ) {
    }

    public static new(value: string | null = null) {

        return new StringVO(value ?? '')
    }

    public split(separator: string) :ArrayVO<string> {
        return new ArrayVO<string>(this.value.split(separator))
    }

    public removeSpace() {
        return new StringVO(this.value.replace(/\s/g, ''))
    }

    public includes(value: string) {

        return this.value.includes(value)
    }

    public equals(value: StringVO) {

        return this.value === value.value
    }

    public parseInt() {
        return NumberVO.new(Number.parseInt(this.value))
    }


}