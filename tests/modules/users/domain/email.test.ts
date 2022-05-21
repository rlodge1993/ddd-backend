import { Email } from '../../../../src/modules/users/domain/email'

describe('An email is created with valid properties', () => {
    const emailOrError = Email.create('ryan@ryan.com')

    test('Should return a successful result object', () => {
        expect(emailOrError.isSuccess()).toBe(true)
    })

    test('We should be able to access the value of the value object', () => {
        const validEmail = emailOrError.getValue()
        expect(validEmail.value()).toBe('ryan@ryan.com')
    })
})

describe('An email with invalid properties is created', () => {
    const emailOrError = Email.create('ryan.com')

    test('An error result should be returned', () => {
        expect(emailOrError.isError()).toBe(true)
    })
})
