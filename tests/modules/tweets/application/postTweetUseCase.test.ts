import { mock, mockReset } from 'jest-mock-extended'
import { TweetRepository } from '../../../../src/modules/tweets/infra/tweetRepository'
import { AuthorRepository } from '../../../../src/modules/tweets/infra/authorRepository'
import { PostTweetUseCase } from '../../../../src/modules/tweets/application/postTweet/postTweetUseCase'
import { PostTweetDTO } from '../../../../src/modules/tweets/application/postTweet/postTweetDTO'
import { Author } from '../../../../src/modules/tweets/domain/author'
import { PostTweetResponse } from '../../../../src/modules/tweets/application/postTweet/postTweetResponse'

process.env.JWT_SECRET = 'test'

const mockTweetRepo = mock<TweetRepository>()
const mockAuthorRepo = mock<AuthorRepository>()
const mockAuthor = mock<Author>()

const useCase = new PostTweetUseCase(mockTweetRepo, mockAuthorRepo)
let reqDTO: PostTweetDTO
let result: PostTweetResponse

beforeEach(() => {
  mockReset(mockTweetRepo)
  mockReset(mockAuthorRepo)
  mockReset(mockAuthor)
  reqDTO = { authorID: '', tweetBody: '', token: '' }
  result = { authorID: '', tweetBody: '', tweetID: '' }
})

describe('A valid tweet is submitted', () => {
  beforeEach(() => {
    reqDTO.tweetBody = 'tweet body'
    reqDTO.authorID = '43ad6f08-ca43-45aa-86e7-698af7c2b685'
  })

  describe('Valid token is provided', () => {
    beforeEach(() => {
      reqDTO.token = 'eyJhbGciOiJIUzI1NiJ9.NDNhZDZmMDgtY2E0My00NWFhLTg2ZTctNjk4YWY3YzJiNjg1.uXRQXV8yOMJGf3EEjxCXlvcxAz7ODrEmNSrUNQtAkjo'
    })

    describe('User exists', () => {
      beforeEach(() => {
        mockAuthorRepo.getByID.mockReturnValue(mockAuthor)
      })

      describe('User is able to tweet', () => {
        beforeEach(() => {
          mockAuthor.canTweet.mockReturnValue(true)
          result = useCase.execute(reqDTO)
        })

        test('Use case should succeed', () => {
          expect(result).toBeDefined()
        })

        test('Save should have been called', () => {
          expect(mockTweetRepo.save).toHaveBeenCalled()
        })

        test('User post count should have been incremented', () => {
          expect(mockAuthor.incrementTweetCount).toHaveBeenCalledWith(1)
        })

        test('Save author should have been called', () => {
          expect(mockAuthorRepo.save).toHaveBeenCalledWith(mockAuthor)
        })
      })

      describe('User is unable to tweet', () => {
        beforeEach(() => {
          mockAuthor.canTweet.mockReturnValue(false)
        })

        test('Use case should throw', () => {
          expect(() => useCase.execute(reqDTO)).toThrow('Not authorized to post tweets')
          expect(mockTweetRepo.save).not.toHaveBeenCalled()
        })
      })
    })

    describe('User does not exist', () => {
      beforeEach(() => {
        mockAuthorRepo.getByID.mockImplementation(() => {
          throw Error('Not found')
        })
      })

      test('Use case should throw', () => {
        expect(() => useCase.execute(reqDTO)).toThrowError('Not found')
        expect(mockTweetRepo.save).not.toHaveBeenCalled()
      })
    })
  })

  describe('Invalid token is provided', () => {
    beforeEach(() => {
      reqDTO.token = 'AyJhbGciOiJIUzI1NiJ9.NDNhZDZmMDgtY2E0My00NWFhLTg2ZTctNjk4YWY3YzJiNjg1.uXRQXV8yOMJGf3EEjxCXlvcxAz7ODrEmNSrUNQtAkjo'
    })

    test('Use case should throw', () => {
      expect(() => useCase.execute(reqDTO)).toThrowError('Invalid token')
      expect(mockTweetRepo.save).not.toHaveBeenCalled()
    })
  })
})
