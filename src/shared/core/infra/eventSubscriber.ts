import { DomainEvent } from '../../domain/domainEvent'

export interface EventSubscriber {
  execute(event: DomainEvent): void
}
