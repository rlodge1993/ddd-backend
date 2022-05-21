import { Tweet } from '../../../../src/modules/tweets/domain/tweet'
import { TweetBody } from '../../../../src/modules/tweets/domain/tweetBody'

let tweet: Tweet

describe('A tweet is created', () => {
  beforeEach(() => {
    tweet = Tweet.create({
      tweetBody: TweetBody.create({body: 'tweet body'}),
      authorID: '1234',
    })
  })

  test('Tweet should have been created', () => {
    expect(tweet).toBeDefined()
  })

  test('Should be able to access the values', () => {
    expect(tweet.body()).toBe('tweet body')
    expect(tweet.author()).toBe('1234')
  })
})
