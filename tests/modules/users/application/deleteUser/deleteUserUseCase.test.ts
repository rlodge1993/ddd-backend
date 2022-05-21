import { UserRepository } from '../../../../../src/modules/users/infra/userRepository'
import { User } from '../../../../../src/modules/users/domain/user'
import { DeleteUserUseCase } from '../../../../../src/modules/users/application/deleteUser/deleteUserUseCase'
import { mock, mockReset } from 'jest-mock-extended'
import { Result } from '../../../../../src/shared/core/result'
import { DeleteUserDTO } from '../../../../../src/modules/users/application/deleteUser/deleteUserDTO'

process.env.JWT_SECRET = 'test'

const mockRepo = mock<UserRepository>()
const mockUser = mock<User>()
const mockUserResult = mock<Result<User>>()
mockUserResult.getValue.mockReturnValue(mockUser)

const useCase = new DeleteUserUseCase(mockRepo)
let result: Result<void>

const validDTO: DeleteUserDTO = {
  id: '8a3d85f2-fb50-4053-9cf1-71d2bfa2f8fa',
  token: 'eyJhbGciOiJIUzI1NiJ9.OGEzZDg1ZjItZmI1MC00MDUzLTljZjEtNzFkMmJmYTJmOGZh.mkcbk5EUrxxXQcEEaAO3XeyBY0MfWXIwD0l_ANW8Z34'
}

const invalidDTO: DeleteUserDTO = {
  id: '8a3d85f2-fb50-4053-9cf1-71d2bfa2f8fa',
  token: '3yJhbGciOiJIUzI1NiJ9.OGEzZDg1ZjItZmI1MC00MDUzLTljZjEtNzFkMmJmYTJmOGZh.mkcbk5EUrxxXQcEEaAO3XeyBY0MfWXIwD0l_ANW8Z34'
}

beforeEach(() => {
  mockReset(mockRepo)
  mockRepo.save.mockReturnValue(Result.createEmptySuccess())
  mockRepo.getByID.mockReturnValue(mockUserResult)
})

describe('A user submits a UID to be deleted with a valid DTO', () => {
  describe('If the user exists', () => {
    beforeEach(() => {
      result = useCase.execute(validDTO)
    })

    test('A success result should be returned', () => {
      expect(result.isSuccess()).toBe(true)
    })

    test('Delete should have been called in user', () => {
      expect(mockUser.delete).toHaveBeenCalled()
    })

    test('Save should be called with deleted user', () => {
      expect(mockRepo.save).toHaveBeenCalledWith(mockUser)
    })
  })

  describe('If the user doesn\'t exist', () => {
    beforeEach(() => {
      mockRepo.getByID.mockReturnValue(Result.createError())
      result = useCase.execute({ id: '', token: '' })
    })

    test('An error should be returned', () => {
      expect(result.isError()).toBe(true)
    })

    test('Save should not have been called', () => {
      expect(mockRepo.save).not.toHaveBeenCalled()
    })
  })
})

describe('A request is submitted with an invalid token', () => {
  beforeEach(() => {
    result = useCase.execute(invalidDTO)
  })

  test('Should result in an error', () => {
    expect(result.isError()).toBe(true)
  })
})
