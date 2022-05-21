import { Result } from '../../../shared/core/result'
import { Secret, sign } from 'jsonwebtoken'
import { ValueObject } from '../../../shared/domain/valueObject'
import { TokenAuthentication } from '../../../shared/core/tokenAuthentication'

interface AuthTokenProps {
  token: string,
  identifier: string
}

export class AuthToken extends ValueObject<AuthTokenProps> {
  constructor(props: AuthTokenProps) {
    super(props)
  }

  verify(): boolean {
    return AuthToken.verify(this.value(), this.identifier())
  }

  identifier(): string {
    return this.props.identifier
  }

  value(): string {
    return this.props.token
  }

  static generate(identifier: string): Result<AuthToken> {
    const secret: Secret = process.env.JWT_SECRET as string
    const token = sign(identifier, secret)
    return Result.createSuccess(new AuthToken({ token, identifier: identifier }))
  }

  static create(props: AuthTokenProps): Result<AuthToken> {
    const isValid = AuthToken.verify(props.token, props.identifier)
    if (!isValid) return Result.createError('Invalid token')
    return Result.createSuccess(new AuthToken(props))
  }

  private static verify(token: string, identifier: string): boolean {
    return TokenAuthentication.verify(token, identifier)
  }
}
