import { PlaintextPassword } from '../../../../src/modules/users/domain/plaintextPassword'
import { BcryptPassword } from '../../../../src/modules/users/domain/bcryptPassword'

describe('A plaintext password is provided', () => {
  let plaintextPassword: PlaintextPassword
  let encryptedPassword: BcryptPassword

  beforeEach(async () => {
    plaintextPassword = PlaintextPassword.create('password').getValue()
    const encryptedPasswordOrError = await BcryptPassword.create(plaintextPassword)
    encryptedPassword = encryptedPasswordOrError.getValue()
  })

  test('An encrypted password should be returned', () => {
    expect(encryptedPassword.value()).toBeTruthy()
  })

  test('It should match the encrypted password', async () => {
    expect(await encryptedPassword.matches(plaintextPassword)).toBe(true)
    expect(await plaintextPassword.matches(encryptedPassword)).toBe(true)
  })

  test('The encrypted password should not match a different password', async () => {
    const otherPlaintextPassword = PlaintextPassword.create('otherpassword').getValue()
    expect(await encryptedPassword.matches(otherPlaintextPassword)).not.toBe(true)
    expect(await otherPlaintextPassword.matches(encryptedPassword)).not.toBe(true)
  })

  describe('A duplicate plaintext password is provided', () => {
    let duplicateEncryptedPassword: BcryptPassword

    beforeEach(async () => {
      const encryptedPasswordOrError = await BcryptPassword.create(plaintextPassword)
      duplicateEncryptedPassword = encryptedPasswordOrError.getValue()
    })

    test('The encrypted passwords should not match', () => {
      expect(encryptedPassword.value()).not.toEqual(duplicateEncryptedPassword)
    })
  })
})
