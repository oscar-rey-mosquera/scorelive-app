export class NumberVO {

    constructor(
        public value: number
    ) {
    }

    public static new(value: number | null = null) {

        return new NumberVO(value ?? 0)
    }
}