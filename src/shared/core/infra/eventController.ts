import { DomainEvent } from '../../domain/domainEvent'
import { EventSubscriber } from './eventSubscriber'

export class EventController {
  eventMap: Map<string, EventSubscriber[]> = new Map()

  addSubscriber(event: typeof DomainEvent, useCase: EventSubscriber): void {
    const eventType = event.name
    const subscriberList = this.eventMap.get(eventType)
    if (!subscriberList) this.eventMap.set(eventType, [useCase])
    else subscriberList.push(useCase)
  }

  submitMessage(event: DomainEvent): void {
    const eventType = event.constructor.name
    const subscriberList = this.eventMap.get(eventType)
    if (!subscriberList) return
    for (const subscriber of subscriberList) {
      subscriber.execute(event)
    }
  }

  submitMessages(events: DomainEvent[]): void {
    for (const event of events) {
      this.submitMessage(event)
    }
  }
}
