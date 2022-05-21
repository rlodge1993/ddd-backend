import { GetUserByIdDTO } from './getUserByIdDTO'
import { UserRepository } from '../../infra/userRepository'
import { GetUserByIdResponse } from './getUserByIdResponse'
import { Result } from '../../../../shared/core/result'

export class GetUserByIdUseCase {
  private readonly userRepo: UserRepository

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  execute(dto: GetUserByIdDTO): Result<GetUserByIdResponse> {
    const userRepo = this.userRepo

    const id = dto.id

    const userOrError = userRepo.getUserByIdDTO(id)

    if (userOrError.isError()) {
      return Result.passError(userOrError)
    }

    const user = userOrError.getValue()

    return Result.createSuccess(user)
  }
}
