import { AuthToken } from '../../../../src/modules/users/domain/authToken'
import { Result } from '../../../../src/shared/core/result'

let token: AuthToken
let tokenOrError: Result<AuthToken>
beforeEach(() => {
  process.env.JWT_SECRET = 'none'
})

describe('A token is generated', () => {
  beforeEach(() => {
    tokenOrError = AuthToken.generate('testtoken')
    token = tokenOrError.getValue()
  })

  test('Token should have a value', () => {
    expect(token.value()).toBeTruthy()
  })

  test('Token should be valid', () => {
    expect(token.verify()).toBe(true)
  })

  describe('An incorrect secret is used', () => {
    beforeEach(() => {
      process.env.JWT_SECRET = 'incorrect'
    })

    test('Token should be invalid', () => {
      expect(token.verify()).toBe(false)
    })
  })
})

describe('A valid token is created', () => {
  beforeEach(() => {
    tokenOrError = AuthToken.create({
      token: 'eyJhbGciOiJIUzI1NiJ9.dGVzdHRva2Vu.P1Cgt_9n5a8XGxyNXmuQlDvfHiihXAme6_vb7iJEYNc',
      identifier: 'testtoken'
    })
  })

  test('Result should be a success', () => {
    expect(tokenOrError.isSuccess()).toBe(true)
  })

  test('Verifying token should succeed', () => {
    token = tokenOrError.getValue()
    expect(token.verify()).toBe(true)
  })
})

describe('An invalid token is created', () => {
  beforeEach(() => {
    tokenOrError = AuthToken.create({
      token: 'eyJhbGciOiJIUzI1NiJ9.dGVzdHRva2Vu.P1Cgt_9n5a8XGxyNXmuQlDvfHiihXAme6_vb7iJEYNc',
      identifier: 'wrongidentifier'
    })
  })

  test('Result should be a failure', () => {
    expect(tokenOrError.isError()).toBe(true)
  })
})
