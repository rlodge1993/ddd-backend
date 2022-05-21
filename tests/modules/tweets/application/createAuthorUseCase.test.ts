import { mock, mockReset } from 'jest-mock-extended'
import { AuthorRepository } from '../../../../src/modules/tweets/infra/authorRepository'
import { CreateAuthorUseCase } from '../../../../src/modules/tweets/application/createAuthor/createAuthorUseCase'
import { CreateAuthorDTO } from '../../../../src/modules/tweets/application/createAuthor/createAuthorDTO'

const mockRepo = mock<AuthorRepository>()
const useCase = new CreateAuthorUseCase(mockRepo)

const reqDTO: CreateAuthorDTO = {
  id: '1234'
}

beforeEach(() => {
  mockReset(mockRepo)
})

describe('Request is submitted', () => {
  describe('Author does not already exist', () => {
    beforeEach(() => {
      mockRepo.exists.mockReturnValue(false)
      try {
        useCase.execute(reqDTO)
      } catch {
      }
    })

    test('Use case should throw', () => {
      expect(() => useCase.execute(reqDTO)).not.toThrow()
    })

    test('Save should be called', () => {
      useCase.execute(reqDTO)
      expect(mockRepo.save).toHaveBeenCalled()
    })
  })

  describe('Author already exists', () => {
    beforeEach(() => {
      mockRepo.exists.mockReturnValue(true)
      try {
        useCase.execute(reqDTO)
      } catch {
      }
    })

    test('Use case should throw', () => {
      expect(() => useCase.execute(reqDTO)).toThrow()
    })

    test('Save should not have been called', () => {
      expect(mockRepo.save).not.toHaveBeenCalled()
    })
  })
})
