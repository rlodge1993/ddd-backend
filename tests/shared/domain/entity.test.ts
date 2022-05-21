import { Entity } from '../../../src/shared/domain/entity'
import { UniqueID } from '../../../src/shared/domain/uniqueID'

interface TestEntityProps {
    value: string
}

class TestEntity extends Entity<TestEntityProps> {
    constructor(props: TestEntityProps, uid?: UniqueID) {
        super(props, uid)
    }
}

describe('An Entity object is created without an existing UID', () => {
    const testEntity = new TestEntity({ value: 'Hello' })

    test('A new UID should be created', () => {
        expect(testEntity.ID()).toBeDefined()
    })
})

describe('An Entity object is created with an existing UID', () => {
    const uidAsString = '7edd8796-5475-4d0e-bf3f-361d2849fdf5'
    const uid = UniqueID.create(uidAsString)
    const testEntity = new TestEntity({ value: 'Hello' }, uid)
    const testEntityWithNewUID = new TestEntity({ value: 'Hello' })

    test('An Entity with matching UID should be created.', () => {
        expect(testEntity.ID()).toBe(uidAsString)
    })

    test('Uniquely generated Entities should not match the UID', () => {
        expect(testEntityWithNewUID.ID()).not.toBe(uidAsString)
    })
})

describe('Two duplicate entities are created', () => {
    const uidAsString = '7edd8796-5475-4d0e-bf3f-361d2849fdf5'
    const uid = UniqueID.create(uidAsString)
    const testEntity = new TestEntity({ value: 'Hello' }, uid)
    const duplicateTestEntity = new TestEntity({ value: 'Hello ' }, uid)

    test('Entities should be equal', () => {
        expect(testEntity.equals(duplicateTestEntity)).toBe(true)
    })
})

describe('Two unique entities are created', () => {
    const testEntity = new TestEntity({ value: 'Hello' })
    const uniqueTestEntity = new TestEntity({ value: 'Hello ' })

    test('Entities should not be equal', () => {
        expect(testEntity.equals(uniqueTestEntity)).not.toBe(true)
    })
})
