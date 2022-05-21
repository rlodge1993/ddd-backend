import { Result } from '../../../src/shared/core/result'
import { DomainError } from '../../../src/shared/domain/domainError'

let result: Result<number>
let result2: Result<string>
let result3: Result<boolean>

describe('A Successful Result is created.', () => {
    beforeEach(() => {
        result = Result.createSuccess(5)
    })

    test('Status should report as success.', () => {
        expect(result.isSuccess()).toEqual(true)
        expect(result.isError()).toEqual(false)
    })

    test('We should be able to access the stored value.', () => {
        expect(result.getValue()).toEqual(5)
    })

    test('Calling getError should result in an exception.', () => {
        expect(result.getError).toThrow()
    })
})

describe('A failed Result is created.', () => {
    beforeEach(() => {
        result = Result.createError()
    })

    test('Status should report as failure.', () => {
        expect(result.isError()).toBe(true)
        expect(result.isSuccess()).toBe(false)
    })

    test('getError() should return a type of DomainError', () => {
        expect(result.getError()).toBeInstanceOf(DomainError)
    })
})

describe('Multiple Results are returned, some containing errors.', () => {
    beforeEach(() => {
        result = Result.createSuccess(4)
        result2 = Result.createError()
        result3 = Result.createError()
    })

    test('Combining the results should result in a single error result.', () => {
        const aggregateResult = Result.combine([
            result, result2, result3
        ])
        expect(aggregateResult.isError()).toBe(true)
        expect(aggregateResult.isSuccess()).toBe(false)
    })
})

describe('Multiple Results are returned, none containing errors.', () => {
    beforeEach(() => {
        result = Result.createSuccess(5)
        result2 = Result.createSuccess('Hello')
        result3 = Result.createSuccess(true)
    })

    test('Combining the results should result in a success result.', () => {
        const aggregateResult = Result.combine([
            result, result2, result3
        ])
        expect(aggregateResult.isSuccess()).toBe(true)
        expect(aggregateResult.isError()).toBe(false)
    })
})
