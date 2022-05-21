import { DomainError } from '../../../src/shared/domain/domainError'

describe('A domain error is created', () => {
    let domainError: DomainError

    test('When no error message is provided, value should return default message', () => {
        domainError = new TestDomainError()
        expect(domainError.value()).toBe('TestDomainError Occurred')
    })

    test('When an error message is provided, value should return the message', () => {
        domainError = new TestDomainError('Oops')
        expect(domainError.value()).toBe('Oops')
    })
})

class TestDomainError extends DomainError {
    defaultMessage: string = 'TestDomainError Occurred'

    constructor(message?: string) {
        super(message)
    }
}
