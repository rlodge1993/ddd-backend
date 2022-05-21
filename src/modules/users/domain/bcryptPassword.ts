import { ValueObject } from '../../../shared/domain/valueObject'
import { PlaintextPassword } from './plaintextPassword'
import { Result } from '../../../shared/core/result'
import { genSalt, hash, compare } from 'bcrypt'

interface BcryptPasswordProps {
  encryptedPassword: string
}

export class BcryptPassword extends ValueObject<BcryptPasswordProps> implements Password {
  private constructor(props: BcryptPasswordProps) {
    super(props)
  }

  value(): string {
    return this.props.encryptedPassword
  }

  async matches(password: Password): Promise<boolean> {
    if (password instanceof BcryptPassword) return this.equals(password)
    if (!(password instanceof PlaintextPassword)) return false
    return await compare(password.value(), this.value())
  }

  static async create(password: PlaintextPassword): Promise<Result<BcryptPassword>> {
    const salt = await genSalt(10)
    const encryptedPassword = await hash(password.value(), salt)
    return Result.createSuccess(new BcryptPassword({ encryptedPassword }))
  }
}
