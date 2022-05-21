import { ValueObject } from './valueObject'
import { randomUUID } from 'crypto'

interface UniqueIDProps {
    id: string
}

export class UniqueID extends ValueObject<UniqueIDProps> {
    private constructor(props: UniqueIDProps) {
        super(props)
    }

    toString(): string {
        return this.props.id
    }

    static create(id?: string) {
        id = id ? id : randomUUID()
        return new UniqueID({ id })
    }
}
