import { UserRepository } from '../../infra/userRepository'
import { CreateUserDTO } from './createUserDTO'
import { Result } from '../../../../shared/core/result'
import { Username } from '../../domain/username'
import { Email } from '../../domain/email'
import { User } from '../../domain/user'
import { PlaintextPassword } from '../../domain/plaintextPassword'
import { BcryptPassword } from '../../domain/bcryptPassword'
import { CreateUserResponse } from './createUserResponse'
import { AuthToken } from '../../domain/authToken'
import { EventController } from '../../../../shared/core/infra/eventController'

export class CreateUserUseCase {
  private readonly userRepository: UserRepository
  private readonly eventController: EventController

  constructor(userRepository: UserRepository, eventController: EventController) {
    this.userRepository = userRepository
    this.eventController = eventController
  }

  async execute(request: CreateUserDTO): Promise<Result<any>> {
    const userRepository = this.userRepository
    const eventController = this.eventController

    const usernameOrError = Username.create(request.username)
    const emailOrError = Email.create(request.email)
    const passwordOrError = PlaintextPassword.create(request.password)

    const dtoResult = Result.combine([
      usernameOrError, emailOrError, passwordOrError,
    ])

    if (dtoResult.isError()) {
      return Result.passError(dtoResult)
    }

    const username = usernameOrError.getValue()
    const email = emailOrError.getValue()
    const plaintextPassword = passwordOrError.getValue()

    if (userRepository.emailAlreadyExists(email)) {
      return Result.createError('User with this email already exists')
    }

    if (userRepository.usernameAlreadyExists(username)) {
      return Result.createError('User with this username already exists')
    }

    const encryptedPasswordOrError = await BcryptPassword.create(plaintextPassword)

    if (encryptedPasswordOrError.isError()) {
      return Result.createError('Password encryption failed')
    }

    const encryptedPassword = encryptedPasswordOrError.getValue()

    const userOrError = User.create({
      username,
      email,
      password: encryptedPassword,
    })

    if (userOrError.isError()) {
      return Result.passError(userOrError)
    }

    const user = userOrError.getValue()

    const saveResult = userRepository.save(user)

    if (saveResult.isError()) {
      return Result.passError(saveResult)
    }

    const id = user.ID()
    const tokenOrError = AuthToken.generate(id)

    if (tokenOrError.isError()) return Result.passError(tokenOrError)

    const token = tokenOrError.getValue()

    const resDTO: CreateUserResponse = {
      id,
      token: token.value(),
    }

    const domainEvents = user.domainEvents()
    eventController.submitMessages(domainEvents)

    return Result.createSuccess(resDTO)
  }
}
