import { ValueObject } from '../../../shared/domain/valueObject'
import { Result } from '../../../shared/core/result'

interface EmailProps {
    email: string
}

export class Email extends ValueObject<EmailProps> {
    private constructor(props: EmailProps) {
        super(props)
    }

    value(): string {
        return this.props.email
    }

    static create(email: string): Result<Email> {
        if (!isValidEmail()) {
            return Result.createError('Invalid email')
        }

        const result = new Email({ email })

        return Result.createSuccess(result)

        function isValidEmail() {
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return emailRegex.test(email)
        }
    }
}
