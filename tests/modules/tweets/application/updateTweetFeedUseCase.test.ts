import { FollowingRepository } from '../../../../src/modules/tweets/infra/followingRepository'
import { TweetRepository } from '../../../../src/modules/tweets/infra/tweetRepository'
import { AuthorRepository } from '../../../../src/modules/tweets/infra/authorRepository'
import {
  UpdateTweetFeedUseCase,
} from '../../../../src/modules/tweets/application/updateTweetFeed/updateTweetFeedUseCase'
import { InMemoryFollowingRepository } from '../../../../src/modules/tweets/infra/inMemoryFollowingRepository'
import { InMemoryTweetRepository } from '../../../../src/modules/tweets/infra/inMemoryTweetRepository'
import { InMemoryAuthorRepository } from '../../../../src/modules/tweets/infra/inMemoryAuthorRepository'
import { Tweet } from '../../../../src/modules/tweets/domain/tweet'
import { TweetBody } from '../../../../src/modules/tweets/domain/tweetBody'
import { Author } from '../../../../src/modules/tweets/domain/author'
import { FollowingRelationship } from '../../../../src/modules/tweets/domain/followingRelationship'
import { UpdateTweetFeedDTO } from '../../../../src/modules/tweets/application/updateTweetFeed/updateTweetFeedDTO'
import {
  UpdateTweetFeedResponse
} from '../../../../src/modules/tweets/application/updateTweetFeed/updateTweetFeedResponse'
import { UniqueID } from '../../../../src/shared/domain/uniqueID'

process.env.JWT_SECRET = 'test'

let followingRepository: FollowingRepository
let tweetRepository: TweetRepository
let authorRepository: AuthorRepository
let useCase: UpdateTweetFeedUseCase

let reqDTO: UpdateTweetFeedDTO

const tweets = [
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet One' }), authorID: '43' }, UniqueID.create('1')),
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet Two' }), authorID: '43' }, UniqueID.create('2')),
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet Three' }), authorID: '21' }, UniqueID.create('3')),
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet Four' }), authorID: '21' }, UniqueID.create('4')),
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet Five' }), authorID: '93' }, UniqueID.create('5')),
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet Six' }), authorID: '93' }, UniqueID.create('6')),
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet Seven' }), authorID: '98' }, UniqueID.create('7')),
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet Eight' }), authorID: '98' }, UniqueID.create('8')),
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet Nine' }), authorID: '101' }, UniqueID.create('9')),
  Tweet.create({ tweetBody: TweetBody.create({ body: 'Tweet Ten' }), authorID: '101' }, UniqueID.create('10')),
]

const authors = [
  Author.create({id: '43', isBanned: false, isDeleted: false}),
  Author.create({id: '21', isBanned: false, isDeleted: false}),
  Author.create({id: '93', isBanned: true, isDeleted: false}),
  Author.create({id: '98', isBanned: false, isDeleted: true}),
  Author.create({id: '101', isBanned: false, isDeleted: false}),
]

const following = [
  FollowingRelationship.create({follower: '43', followee: '98', followingSince: new Date()}),
  FollowingRelationship.create({follower: '43', followee: '93', followingSince: new Date()}),
  FollowingRelationship.create({follower: '43', followee: '101', followingSince: new Date()}),
  FollowingRelationship.create({follower: '21', followee: '101', followingSince: new Date()}),
  FollowingRelationship.create({follower: '21', followee: '43', followingSince: new Date()}),
  FollowingRelationship.create({follower: '21', followee: '98', followingSince: new Date()}),
  FollowingRelationship.create({follower: '93', followee: '98', followingSince: new Date()}),
  FollowingRelationship.create({follower: '93', followee: '101', followingSince: new Date()}),
  FollowingRelationship.create({follower: '93', followee: '21', followingSince: new Date()}),
  FollowingRelationship.create({follower: '98', followee: '21', followingSince: new Date()}),
  FollowingRelationship.create({follower: '98', followee: '93', followingSince: new Date()}),
  FollowingRelationship.create({follower: '98', followee: '101', followingSince: new Date()}),
  FollowingRelationship.create({follower: '101', followee: '21', followingSince: new Date()}),
  FollowingRelationship.create({follower: '101', followee: '43', followingSince: new Date()}),
  FollowingRelationship.create({follower: '101', followee: '93', followingSince: new Date()}),
]

const expectedResult: UpdateTweetFeedResponse = {
  authors: [
    {
      authorID: '21',
    },
    {
      authorID: '101',
    },
  ],
  tweets: [
    {
      authorID: '21',
      tweetBody: 'Tweet Three',
      tweetID: '3',
    },
    {
      authorID: '21',
      tweetBody: 'Tweet Four',
      tweetID: '4',
    },
    {
      authorID: '101',
      tweetBody: 'Tweet Nine',
      tweetID: '9',
    },
    {
      authorID: '101',
      tweetBody: 'Tweet Ten',
      tweetID: '10',
    },
  ]
}

beforeEach(() => {
  followingRepository = new InMemoryFollowingRepository()
  following.map((relationship) => followingRepository.save(relationship))

  tweetRepository = new InMemoryTweetRepository()
  tweets.map((tweet) => tweetRepository.save(tweet))

  authorRepository = new InMemoryAuthorRepository()
  authors.map((author) => authorRepository.save(author))

  useCase = new UpdateTweetFeedUseCase(followingRepository, tweetRepository, authorRepository)

  // @ts-ignore
  reqDTO = {}
})

describe('User requests to update their feed', () => {
  describe('User submits a valid token', () => {
    beforeEach(() => {
      reqDTO.userID = '98'
      reqDTO.token = 'eyJhbGciOiJIUzI1NiJ9.OTg.WJj9A4GjntdCoSsI5jBpJkdsy9NEW_HCGo53-0MtXBg'
    })

    test('Use case should succeed', () => {
      expect(() => useCase.execute(reqDTO)).not.toThrow()
    })

    test('Result should contain tweets', () => {
      const result = useCase.execute(reqDTO)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('User submits an invalid token', () => {
    beforeEach(() => {
      reqDTO.userID = '96'
      reqDTO.token = 'eyJhbGciOiJIUzI1NiJ9.OTg.WJj9A4GjntdCoSsI5jBpJkdsy9NEW_HCGo53-0MtXBg'
    })

    test('Use case should throw', () => {
      expect(() => useCase.execute(reqDTO)).toThrow()
    })
  })
})
