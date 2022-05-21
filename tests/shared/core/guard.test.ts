import { Guard } from '../../../src/shared/core/guard'

describe('A null value is tested for null or undefined', () => {
    const input = null

    test('Guard should return with an error message', () => {
        const result = Guard.againstNullOrUndefined(input)
        expect(result).toBe('Value is null or undefined')
    })

    test('When a type parameter is provided, it should be reflected in error message', () => {
        const result = Guard.againstNullOrUndefined(input, 'ThisValue')
        expect(result).toBe('ThisValue is null or undefined')
    })
})

describe('An undefined value is tested for null or undefined', () => {
    const input = undefined

    test('Guard should return with an error message', () => {
        const result = Guard.againstNullOrUndefined(input)
        expect(result).toBe('Value is null or undefined')
    })
})

describe('A non-null value is tested for null or undefined', () => {
    const input = ''

    test('Guard should return null', () => {
        const result = Guard.againstNullOrUndefined(input)
        expect(result).toBe(null)
    })
})
