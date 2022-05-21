import { Username } from '../domain/username'
import { Email } from '../domain/email'
import { Result } from '../../../shared/core/result'
import { User } from '../domain/user'
import { UniqueID } from '../../../shared/domain/uniqueID'
import { GetUserByIdResponse } from '../application/getUserById/getUserByIdResponse'

export interface UserRepository {
    save(user: User): Result<void>
    emailAlreadyExists(email: Email): boolean
    usernameAlreadyExists(username: Username): boolean
    getByID(ID: UniqueID): Result<User>
    getUserByIdDTO(ID: string): Result<GetUserByIdResponse>
    getByUsername(username: Username): Result<User>
    getByEmail(email: Email): Result<User>
}
