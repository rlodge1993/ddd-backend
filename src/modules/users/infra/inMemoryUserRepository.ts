import { UserRepository } from './userRepository'
import { User } from '../domain/user'
import { Username } from '../domain/username'
import { Email } from '../domain/email'
import { Result } from '../../../shared/core/result'
import { UniqueID } from '../../../shared/domain/uniqueID'
import { GetUserByIdResponse } from '../application/getUserById/getUserByIdResponse'

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []

  usernameAlreadyExists(username: Username): boolean {
    for (const user of this.users) {
      if (user.username().equals(username)) return true
    }
    return false
  }

  emailAlreadyExists(email: Email): boolean {
    for (const user of this.users) {
      if (user.email().equals(email) && !user.isDeleted()) return true
    }
    return false
  }

  save(user: User): Result<void> {
    for (let repoUser of this.users) {
      if (repoUser.ID.toString() == user.ID().toString()) {
        repoUser = user
        return Result.createEmptySuccess()
      }
    }
    this.users.push(user)
    return Result.createEmptySuccess()
  }

  getByID(ID: UniqueID): Result<User> {
    for (const user of this.users) {
      if (user.ID() === ID.toString() && !user.isDeleted()) {
        return Result.createSuccess(user)
      }
    }
    return Result.createError('User not found')
  }

  getUserByIdDTO(ID: string): Result<GetUserByIdResponse> {
    for (const user of this.users) {
      if (user.ID() === ID.toString() && !user.isDeleted()) {
        return Result.createSuccess({ username: user.username().value() })
      }
    }
    return Result.createError('User not found')
  }

  getByEmail(email: Email): Result<User> {
    for (const user of this.users) {
      if (user.email().equals(email) && !user.isDeleted()) {
        return Result.createSuccess(user)
      }
    }
    return Result.createError('User not found')
  }

  getByUsername(username: Username): Result<User> {
    for (const user of this.users) {
      if (user.username().equals(username) && !user.isDeleted()) {
        return Result.createSuccess(user)
      }
    }
    return Result.createError('User not found')
  }
}
