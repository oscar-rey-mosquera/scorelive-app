import * as Crypto from 'expo-crypto';
export class IdVO {

    constructor(
        public value: string
    ) {
    }

    public static new(value: string | null = null) {

        return new IdVO(value ?? Crypto.randomUUID());
    }
}