import { UserRepository } from '../../infra/userRepository'
import { Result } from '../../../../shared/core/result'
import { DeleteUserDTO } from './deleteUserDTO'
import { UniqueID } from '../../../../shared/domain/uniqueID'
import { Guard } from '../../../../shared/core/guard'
import { AuthToken } from '../../domain/authToken'

export class DeleteUserUseCase {
  private userRepo: UserRepository

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  execute(reqDTO: DeleteUserDTO): Result<void> {
    const userRepo = this.userRepo

    if (Guard.againstNullOrUndefined(reqDTO.id)) {
      return Result.createError()
    }

    const authTokenOrError = AuthToken.create({
      token: reqDTO.token,
      identifier: reqDTO.id,
    })

    if (authTokenOrError.isError()) {
      return Result.passError(authTokenOrError)
    }

    const id = UniqueID.create(reqDTO.id)

    const userOrError = userRepo.getByID(id)

    if (userOrError.isError()) {
      return Result.passError(userOrError)
    }

    const user = userOrError.getValue()

    user.delete()

    userRepo.save(user)

    return Result.createEmptySuccess()
  }
}
