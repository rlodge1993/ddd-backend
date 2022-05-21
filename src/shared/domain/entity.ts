import { UniqueID } from './uniqueID'

export abstract class Entity<T> {
    private id: UniqueID
    protected props: T

    protected constructor(props: T, id?: UniqueID) {
        this.props = props
        this.id = id ? id : UniqueID.create()
    }

    ID(): string {
        return this.id.toString()
    }

    equals(entity: Entity<T>): boolean {
        return this.ID() === entity.ID()
    }
}
