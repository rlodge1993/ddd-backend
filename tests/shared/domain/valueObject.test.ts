import { ValueObject } from '../../../src/shared/domain/valueObject'

interface TestValueObjectProps {
    aString: string,
    aNumber: number,
    aBoolean: boolean,
}

class TestValueObject extends ValueObject<TestValueObjectProps> {
    constructor(props: TestValueObjectProps) {
        super(props)
    }
}

describe('A value object is created', () => {
    const testValueObject = new TestValueObject({
        aString: 'Hello',
        aNumber: 5,
        aBoolean: true
    })

    test('Properties should be immutable', () => {
        expect(() => {
            testValueObject.props.aNumber = 1
        }).toThrow()
    })
})

describe('Two matching value objects are created', () => {
    const testValueObject1 = new TestValueObject({ aString: 'Hello', aNumber: 1, aBoolean: true })
    const testValueObject2 = new TestValueObject({ aString: 'Hello', aNumber: 1, aBoolean: true })

    test('Calling equals should return true', () => {
        expect(testValueObject1.equals(testValueObject2)).toBe(true)
    })
})

describe('Two non-matching value objects are created', () => {
    const testValueObject1 = new TestValueObject({ aString: 'Hello', aNumber: 1, aBoolean: true })
    const testValueObject2 = new TestValueObject({ aString: 'Hello!', aNumber: 2, aBoolean: false })

    test('Calling equals should return false', () => {
        expect(testValueObject1.equals(testValueObject2)).toBe(false)
    })
})
