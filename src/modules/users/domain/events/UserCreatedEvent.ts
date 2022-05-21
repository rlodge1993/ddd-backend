import { DomainEvent } from '../../../../shared/domain/domainEvent'
import { User } from '../user'

export class UserCreatedEvent extends DomainEvent {
  constructor(user: User) {
    super(user)
  }
}
