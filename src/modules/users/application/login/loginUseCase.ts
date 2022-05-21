import { UserRepository } from '../../infra/userRepository'
import { LoginDTO } from './loginDTO'
import { Result } from '../../../../shared/core/result'
import { LoginResponse } from './loginResponse'
import { User } from '../../domain/user'
import { Username } from '../../domain/username'
import { Email } from '../../domain/email'
import { PlaintextPassword } from '../../domain/plaintextPassword'
import { AuthToken } from '../../domain/authToken'

export class LoginUseCase {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(reqDTO: LoginDTO): Promise<Result<LoginResponse>> {
    const userRepository = this.userRepository
    let userOrError: Result<User>

    const passwordOrError = PlaintextPassword.create(reqDTO.password)

    if (passwordOrError.isError()) {
      return Result.createError('Valid password not provided')
    }

    const reqPassword = passwordOrError.getValue()

    if (reqDTO.username) {
      const usernameOrError = Username.create(reqDTO.username)
      if (usernameOrError.isError()) return Result.passError(usernameOrError)
      const username = usernameOrError.getValue()
      userOrError = userRepository.getByUsername(username)
    } else if (reqDTO.email) {
      const emailOrError = Email.create(reqDTO.email)
      if (emailOrError.isError()) return Result.passError(emailOrError)
      const email = emailOrError.getValue()
      userOrError = userRepository.getByEmail(email)
    } else {
      return Result.createError('Username or Email not provided')
    }

    if (userOrError.isError()) {
      return Result.passError(userOrError)
    }

    const user = userOrError.getValue()
    const password = user.password()

    if (!await password.matches(reqPassword)) {
      return Result.createError('Incorrect password')
    }

    const userID = user.ID()

    const tokenOrError = AuthToken.generate(userID)
    if (tokenOrError.isError()) return Result.passError(tokenOrError)

    const token = tokenOrError.getValue()

    const resDTO = {
      id: userID,
      token: token.value(),
    }

    return Result.createSuccess(resDTO)
  }
}
