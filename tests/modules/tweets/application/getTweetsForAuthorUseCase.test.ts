import { mock, mockReset } from 'jest-mock-extended'
import { TweetRepository } from '../../../../src/modules/tweets/infra/tweetRepository'
import {
  GetTweetsForAuthorUseCase,
} from '../../../../src/modules/tweets/application/getTweetsForAuthor/getTweetsForAuthorUseCase'
import { AuthorRepository } from '../../../../src/modules/tweets/infra/authorRepository'
import {
  GetTweetsForAuthorDTO,
} from '../../../../src/modules/tweets/application/getTweetsForAuthor/getTweetsForAuthorDTO'

const mockTweetRepository = mock<TweetRepository>()
const mockAuthorRepository = mock<AuthorRepository>()
const useCase = new GetTweetsForAuthorUseCase(mockTweetRepository, mockAuthorRepository)
let reqDTO: GetTweetsForAuthorDTO
const tweets = {
  tweets: [
    {
      authorID: '1234',
      tweetID: '9998',
      tweetBody: 'This is a tweet',
    },
    {
      authorID: '12345',
      tweetID: '9999',
      tweetBody: 'This is also a tweet',
    },
  ],
}

beforeEach(() => {
  mockReset(mockTweetRepository)
  mockReset(mockAuthorRepository)
  // @ts-ignore
  reqDTO = {}
})

describe('A user requests tweets for an ID', () => {
  beforeEach(() => {
    reqDTO.authorID = '1234'
  })

  describe('The user exists', () => {
    beforeEach(() => {
      mockTweetRepository.getTweetsForAuthor.mockReturnValue(tweets)
    })

    test('Use case should succeed', () => {
      expect(() => useCase.execute(reqDTO)).not.toThrow()
    })

    test('DTO should contain tweets', () => {
      const result = useCase.execute(reqDTO)
      expect(result).toEqual(tweets)
    })
  })
})
