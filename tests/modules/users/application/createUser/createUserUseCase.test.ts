import { CreateUserUseCase } from '../../../../../src/modules/users/application/createUser/createUserUseCase'
import { UserRepository } from '../../../../../src/modules/users/infra/userRepository'
import { Result } from '../../../../../src/shared/core/result'
import { CreateUserDTO } from '../../../../../src/modules/users/application/createUser/createUserDTO'
import { mock, mockReset } from 'jest-mock-extended'
import { EventController } from '../../../../../src/shared/core/infra/eventController'

process.env.JWT_SECRET = 'test'

const mockRepo = mock<UserRepository>()
const mockEventController = mock<EventController>()
const useCase = new CreateUserUseCase(mockRepo, mockEventController)
let result: Result<void>

beforeEach(() => {
  mockReset(mockRepo)
  mockReset(mockEventController)
  mockRepo.save.mockReturnValue(Result.createEmptySuccess())
  mockRepo.emailAlreadyExists.mockReturnValue(false)
  mockRepo.usernameAlreadyExists.mockReturnValue(false)
})

describe('When a user submits valid details', () => {
  const validUserDTO: CreateUserDTO = {
    username: 'Ryan',
    email: 'ryan@ryan.com',
    password: 'password',
  }

  describe('If the user doesn\'t already exist', () => {
    beforeEach(async () => {
      result = await useCase.execute(validUserDTO)
    })

    test('A success result should be returned', () => {
      expect(result.isSuccess()).toBe(true)
    })

    test('It should be saved', () => {
      expect(mockRepo.save).toHaveBeenCalled()
    })

    test('An event should have been dispatched', () => {
      expect(mockEventController.submitMessages).toHaveBeenCalled()
    })
  })

  describe('If the user already exists', () => {
    beforeEach(async () => {
      mockRepo.usernameAlreadyExists.mockReturnValue(true)
      result = await useCase.execute(validUserDTO)
    })

    test('An error should be returned', () => {
      expect(result.isError()).toBe(true)
    })

    test('Save should not be called', () => {
      expect(mockRepo.save).not.toHaveBeenCalled()
    })
  })

  describe('If the email already exists', () => {
    beforeEach(async () => {
      mockRepo.emailAlreadyExists.mockReturnValue(true)
      result = await useCase.execute(validUserDTO)
    })

    test('An error should be returned', () => {
      expect(result.isError()).toBe(true)
    })

    test('Save should not be called', () => {
      expect(mockRepo.save).not.toHaveBeenCalled()
    })
  })

  describe('If an error is encountered during save', () => {
    beforeEach(async () => {
      mockRepo.save.mockReturnValue(Result.createError())
      result = await useCase.execute(validUserDTO)
    })

    test('An error should be returned', () => {
      expect(result.isError()).toBe(true)
    })

    test('Save should have been called', () => {
      expect(mockRepo.save).toHaveBeenCalled()
    })
  })
})

describe('When a user submits invalid details', () => {
  const invalidUserDTO = {
    username: 'As',
    email: 'ryan@ryan.com',
    password: 'password'
  }

  beforeEach(async () => {
    result = await useCase.execute(invalidUserDTO)
  })

  test('An error is returned', () => {
    expect(result.isError()).toBe(true)
  })

  test('Save should not be called', () => {
    expect(mockRepo.save).not.toHaveBeenCalled()
  })
})
