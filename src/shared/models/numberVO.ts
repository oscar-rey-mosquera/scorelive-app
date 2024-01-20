export class NumberVO {

    constructor(
        public value: number
    ) {
    }

    public static new(value: number | null = null) {

        return new NumberVO(value ?? 0)
    }

    public equals(value: NumberVO) {

        return this.value === value.value
    }

    public lessThan(value: NumberVO) {

        return this.value < value.value
    }
}