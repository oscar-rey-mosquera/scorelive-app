import {ArrayVO} from "@/src/shared/models/arrayVO";

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


}