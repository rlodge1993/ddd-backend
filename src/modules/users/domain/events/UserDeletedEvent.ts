import { DomainEvent } from '../../../../shared/domain/domainEvent'
import { User } from '../user'

export class UserDeletedEvent extends DomainEvent {
  constructor(user: User) {
    super(user)
  }
}
