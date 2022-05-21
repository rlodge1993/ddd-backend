import { Username } from '../../../../src/modules/users/domain/username'
import { Result } from '../../../../src/shared/core/result'

let usernameOrError: Result<Username>

describe('A Username value object is created with valid properties', () => {
    beforeEach(() => {
        usernameOrError = Username.create('Ryan')
    })

    test('A successful result should be returned', () => {
        expect(usernameOrError.isSuccess()).toBe(true)
    })

    test('The value should be accessible', () => {
        const validUsername = usernameOrError.getValue()
        expect(validUsername.value()).toBe('Ryan')
    })
})

test('A user name thats too short is created', () => {
    const nameTooShort = Username.create('As')
    expect(nameTooShort.isError()).toBe(true)
})

test('A username thats too long is created', () => {
    const nameTooLong = Username.create('Asdfghjklasdfghjklasd')
    expect(nameTooLong.isError()).toBe(true)
})
