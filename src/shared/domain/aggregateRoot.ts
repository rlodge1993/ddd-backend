import { Entity } from './entity'
import { UniqueID } from './uniqueID'
import { DomainEvent } from './domainEvent'

export abstract class AggregateRoot<T> extends Entity<T> {
  events: DomainEvent[] = []

  protected constructor(props: T, id?: UniqueID) {
    super(props, id)
  }

  addDomainEvent(event: DomainEvent) {
    this.events.push(event)
  }

  domainEvents(): DomainEvent[] {
    return this.events
  }
}
