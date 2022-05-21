import { ValueObject } from '../../../shared/domain/valueObject'
import { Result } from '../../../shared/core/result'

interface UsernameProps {
    username: string
}

export class Username extends ValueObject<UsernameProps> {
    private static MIN_LENGTH = 3
    private static MAX_LENGTH = 20

    private constructor(props: UsernameProps) {
        super(props)
    }

    value(): string {
        return this.props.username
    }

    static create(username: string): Result<Username> {
        if (!isCorrectLength()) {
            return Result.createError(`Username must be between ${Username.MIN_LENGTH} and ${Username.MAX_LENGTH} characters in length`)
        }

        const result = new Username({ username })

        return Result.createSuccess(result)

        function isCorrectLength() {
            return username.length >= Username.MIN_LENGTH
                && username.length <= Username.MAX_LENGTH
        }
    }
}
