import { ValueObject } from '../../../shared/domain/valueObject'
import { Result } from '../../../shared/core/result'

interface PlaintextPasswordProps {
  password: string
}

export class PlaintextPassword extends ValueObject<PlaintextPasswordProps> {
  private static MIN_LENGTH = 6
  private static MAX_LENGTH = 20

  private constructor(props: PlaintextPasswordProps) {
    super(props)
  }

  value(): string {
    return this.props.password
  }

  async matches(password: Password): Promise<boolean> {
    if (!(password instanceof PlaintextPassword)) return password.matches(this)
    else return this.equals(password)
  }

  static create(password: string): Result<PlaintextPassword> {
    if (!isCorrectLength()) {
      return Result.createError(`Password must be between ${PlaintextPassword.MIN_LENGTH} and ${PlaintextPassword.MAX_LENGTH} characters in length`)
    }

    const result = new PlaintextPassword({ password })

    return Result.createSuccess(result)

    function isCorrectLength() {
      return password.length >= PlaintextPassword.MIN_LENGTH
        && password.length <= PlaintextPassword.MAX_LENGTH
    }
  }
}
