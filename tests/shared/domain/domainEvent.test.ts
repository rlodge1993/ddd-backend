import { DomainEvent } from '../../../src/shared/domain/domainEvent'
import { AggregateRoot } from '../../../src/shared/domain/aggregateRoot'

interface TestAggregateProps {
  testString: string
}

class TestAggregate extends AggregateRoot<TestAggregateProps> {
  constructor(props: TestAggregateProps) {
    super(props)
  }
}

class TestDomainEvent extends DomainEvent {
  constructor(aggregate: TestAggregate) {
    super(aggregate)
  }
}

let domainEvent: DomainEvent
const testAggregate = new TestAggregate({ testString: 'test' })

describe('Domain event is created', () => {
  beforeEach(() => {
    domainEvent = new TestDomainEvent(testAggregate)
  })

  test('Domain event id should match aggregate', () => {
    expect(domainEvent.id()).toBe(testAggregate.ID())
  })

  test('Domain event should have a type', () => {
    expect(domainEvent instanceof TestDomainEvent).toBe(true)
    expect(domainEvent.constructor).toBe(TestDomainEvent)
  })
})
