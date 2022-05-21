import { Result } from '../../../../src/shared/core/result'
import { PlaintextPassword } from '../../../../src/modules/users/domain/plaintextPassword'

let passwordOrError: Result<PlaintextPassword>

describe('A password value object is created with valid properties', () => {
    passwordOrError = PlaintextPassword.create('password')

    test('Should return a successful result object', () => {
        expect(passwordOrError.isSuccess()).toBe(true)
    })

    test('The password value should be accessible', () => {
        const validPassword = passwordOrError.getValue()
        expect(validPassword.value()).toBe('password')
    })
})

test('A password is created with undefined values', () => {
    passwordOrError = PlaintextPassword.create('')
    expect(passwordOrError.isError()).toBe(true)
})

test('A password that is too long is created', () => {
    passwordOrError = PlaintextPassword.create('asdfghjklasdfghjklasa')
    expect(passwordOrError.isError()).toBe(true)
})

test('A password that is too short is created', () => {
    passwordOrError = PlaintextPassword.create('asdfg')
    expect(passwordOrError.isError()).toBe(true)
})
