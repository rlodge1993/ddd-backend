import { User } from '../../../../src/modules/users/domain/user'
import { Username } from '../../../../src/modules/users/domain/username'
import { Email } from '../../../../src/modules/users/domain/email'
import { PlaintextPassword } from '../../../../src/modules/users/domain/plaintextPassword'
import { UniqueID } from '../../../../src/shared/domain/uniqueID'

let usernameOrError = Username.create('Ryan')
let emailOrError = Email.create('ryan@ryan.com')
let passwordOrError = PlaintextPassword.create('password')
let username = usernameOrError.getValue()
let email = emailOrError.getValue()
let password = passwordOrError.getValue()

describe('A User is created with valid credentials', () => {
  const userOrError = User.create({
    username,
    email,
    password,
  })
  const user = userOrError.getValue()

  test('User should be created with all the provided fields', () => {
    expect(user.username()).toBe(username)
    expect(user.email()).toBe(email)
    expect(user.password()).toBe(password)
  })

  test('Domain event should have been created', () => {
    expect(user.domainEvents().length).toBe(1)
  })
})

describe('A user is created with a pre-existing id', () => {
  const userOrError = User.create({
    username,
    email,
    password,
  }, UniqueID.create('1234'))
  const user = userOrError.getValue()

  test('Domain event should not have been created', () => {
    expect(user.domainEvents().length).toBe(0)
  })
})

describe('An attempt is made to create a deleted user', () => {
  const userOrError = User.create({
    username,
    email,
    password,
    isDeleted: true,
  })

  test('Should result in an error', () => {
    expect(userOrError.isError()).toBe(true)
  })
})
