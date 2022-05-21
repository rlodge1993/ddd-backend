import { FollowingRepository } from '../../../../src/modules/tweets/infra/followingRepository'
import { mock, mockReset } from 'jest-mock-extended'
import { FollowAuthorUseCase } from '../../../../src/modules/tweets/application/followAuthor/followAuthorUseCase'
import { AuthorRepository } from '../../../../src/modules/tweets/infra/authorRepository'
import { FollowAuthorDTO } from '../../../../src/modules/tweets/application/followAuthor/followAuthorDTO'

process.env.JWT_SECRET = 'test'

const mockFollowingRepository = mock<FollowingRepository>()
const mockAuthorRepository = mock<AuthorRepository>()
const useCase = new FollowAuthorUseCase(mockFollowingRepository, mockAuthorRepository)
let reqDTO: FollowAuthorDTO

beforeEach(() => {
  mockReset(mockFollowingRepository)
  mockReset(mockAuthorRepository)
  // @ts-ignore
  reqDTO = {}
})

describe('A user attempts to follow a user', () => {
  beforeEach(() => {
    reqDTO.authorID = '1234'
    reqDTO.userID = '7a1b4bfd-8b36-4158-b575-c5ddd68a4913'
    reqDTO.token = 'eyJhbGciOiJIUzI1NiJ9.N2ExYjRiZmQtOGIzNi00MTU4LWI1NzUtYzVkZGQ2OGE0OTEz.q7NKkdFFGWqS19pCEw8YeWNxeaErfVJhdZnZjeqlkXY'
  })

  describe('The user exists', () => {
    beforeEach(() => {
      mockAuthorRepository.exists.mockReturnValue(true)
    })

    describe('The user is not already following the target user', () => {
      beforeEach(() => {
        mockFollowingRepository.exists.mockReturnValue(false)
      })

      test('Use case should be successful', () => {
        expect(() => useCase.execute(reqDTO)).not.toThrow()
      })

      test('Use case should return a following relationship', () => {
        const result = useCase.execute(reqDTO)
        expect(result).toEqual({
          followerID: '7a1b4bfd-8b36-4158-b575-c5ddd68a4913',
          followeeID: '1234',
        })
      })

      test('Save should have been called', () => {
        useCase.execute(reqDTO)
        expect(mockFollowingRepository.save).toHaveBeenCalled()
      })
    })

    describe('The user is already following the target user', () => {
      beforeEach(() => {
        mockFollowingRepository.exists.mockReturnValue(true)
      })

      test('Use case should throw', () => {
        expect(() => useCase.execute(reqDTO)).toThrow()
      })

      test('Save should not be called', () => {
        expect(mockFollowingRepository.save).not.toHaveBeenCalled()
      })
    })
  })

  describe('The user doesn\'t exist', () => {
    beforeEach(() => {
      mockAuthorRepository.exists.mockReturnValue(false)
    })

    test('Use case should throw', () => {
      expect(() => useCase.execute(reqDTO)).toThrow()
    })
  })
})
