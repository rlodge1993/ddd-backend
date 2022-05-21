import { AggregateRoot } from '../../../src/shared/domain/aggregateRoot'
import { UniqueID } from '../../../src/shared/domain/uniqueID'

interface AggregateRootTestProps {
    aString: string
}

class AggregateRootTest extends AggregateRoot<AggregateRootTestProps> {
    constructor(props: AggregateRootTestProps, uid?: UniqueID) {
        super(props, uid)
    }

    getStringValue(): string {
        return this.props.aString
    }
}

describe('An aggregate root is created', () => {
    const testAggregateRoot = new AggregateRootTest({ aString: 'Hello' })

    it('Aggregate root value should be accessible', () => {
        expect(testAggregateRoot.getStringValue()).toBe('Hello')
    })

})
