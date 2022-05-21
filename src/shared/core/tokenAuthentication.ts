import { Secret, verify } from 'jsonwebtoken'

export class TokenAuthentication {
  static verify(token: string, identifier: string): boolean {
    const secret: Secret = process.env.JWT_SECRET as string
    try {
      const decoded = verify(token, secret)
      if (identifier === decoded) return true
    } catch {
      return false
    }
    return false
  }
}
