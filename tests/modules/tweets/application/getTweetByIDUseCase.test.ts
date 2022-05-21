import { mock, mockReset } from 'jest-mock-extended'
import { AuthorRepository } from '../../../../src/modules/tweets/infra/authorRepository'
import { TweetRepository } from '../../../../src/modules/tweets/infra/tweetRepository'
import { GetTweetByIDUseCase } from '../../../../src/modules/tweets/application/getTweetByID/getTweetByIDUseCase'
import { GetTweetByIDDTO } from '../../../../src/modules/tweets/application/getTweetByID/getTweetByIDDTO'
import { Tweet } from '../../../../src/modules/tweets/domain/tweet'

const mockAuthorRepo = mock<AuthorRepository>()
const mockTweetRepo = mock<TweetRepository>()
const useCase = new GetTweetByIDUseCase(mockAuthorRepo, mockTweetRepo)
const mockTweet = mock<Tweet>()
let reqDTO: GetTweetByIDDTO

beforeEach(() => {
  // @ts-ignore
  reqDTO = {}
  mockReset(mockAuthorRepo)
  mockReset(mockTweetRepo)
  mockReset(mockTweet)
  mockTweet.ID.mockReturnValue('1234')
  mockTweet.body.mockReturnValue('This is a tweet')
  mockTweet.author.mockReturnValue('9999')
})

describe('A tweet request is submitted', () => {
  beforeEach(() => {
    reqDTO.tweetID = '1234'
  })

  describe('Tweet exists', () => {
    beforeEach(() => {
      mockTweetRepo.getByID.mockReturnValue({
        tweetID: '1234',
        tweetBody: 'This is a tweet',
        authorID: '9999',
      })
    })

    test('Use case should succeed', () => {
      expect(() => useCase.execute(reqDTO)).not.toThrow()
    })

    test('Return result should contain tweet details', () => {
      const result = useCase.execute(reqDTO)
      expect(result).toEqual({
        tweetID: '1234',
        tweetBody: 'This is a tweet',
        authorID: '9999',
      })
    })
  })
})
