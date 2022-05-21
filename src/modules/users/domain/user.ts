import { Username } from './username'
import { Email } from './email'
import { AggregateRoot } from '../../../shared/domain/aggregateRoot'
import { UniqueID } from '../../../shared/domain/uniqueID'
import { Result } from '../../../shared/core/result'
import { UserCreatedEvent } from './events/UserCreatedEvent'

interface UserProps {
    username: Username,
    email: Email,
    password: Password,
    isDeleted?: boolean,
}

export class User extends AggregateRoot<UserProps> {
    constructor(props: UserProps, id?: UniqueID) {
        super(props, id)
    }

    username(): Username {
        return this.props.username
    }

    email(): Email {
        return this.props.email
    }

    password(): Password {
        return this.props.password
    }

    isDeleted(): boolean {
        return !!this.props.isDeleted
    }

    delete(): void {
        this.props.isDeleted = true
    }

    static create(props: UserProps, id?: UniqueID): Result<User> {
        if (props.isDeleted) {
            return Result.createError('User is deleted')
        }

        const newUser = id ? false : true

        const user = new User(props, id)
        if (newUser) user.addDomainEvent(new UserCreatedEvent(user))
        return Result.createSuccess(user)
    }
}
