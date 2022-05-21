import { AggregateRoot } from './aggregateRoot'

export abstract class DomainEvent {
  private _id: string

  constructor(aggregate: AggregateRoot<any>) {
    this._id = aggregate.ID()
  }

  id(): string {
    return this._id
  }
}
