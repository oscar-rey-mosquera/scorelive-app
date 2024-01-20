export class ArrayVO<T> {

    constructor(
        public value: T[]
    ) {
    }

    public static new(value: T[] | null = null) {

        return new ArrayVO(value ?? [])
    }

    public isEmpty() {

        return this.value.length === 0
    }

    public isNotEmpty() {

        return !this.isEmpty()
    }

    //firts element
    public first(): T | undefined {
        return this.value[0];
    }

    //last element

    public last(): T | undefined {
        return this.value[this.value.length - 1];
    }

}