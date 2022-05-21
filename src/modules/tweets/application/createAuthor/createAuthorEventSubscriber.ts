import { UserCreatedEvent } from '../../../users/domain/events/UserCreatedEvent'
import { CreateAuthorUseCase } from './createAuthorUseCase'
import { CreateAuthorDTO } from './createAuthorDTO'

export class CreateAuthorEventSubscriber {
  private useCase: CreateAuthorUseCase

  constructor(useCase: CreateAuthorUseCase) {
    this.useCase = useCase
  }

  execute(event: UserCreatedEvent): void {
    const reqDTO: CreateAuthorDTO = {
      id: event.id(),
    }

    try {
      this.useCase.execute(reqDTO)
    } catch {
      console.log('CreateAuthorEventSubscriber error')
    }
  }
}
