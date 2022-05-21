import { TweetBody } from '../../../../src/modules/tweets/domain/tweetBody'

let tweetBody: TweetBody
beforeEach(() => {
  // @ts-ignore
  tweetBody = undefined
})

describe('A tweetbody is created', () => {
  beforeEach(() => {
    tweetBody = TweetBody.create({ body: 'this is a tweet' })
  })

  test('The value should be accessible', () => {
    expect(tweetBody.value()).toBe('this is a tweet')
  })
})

describe('A tweetbody longer than 140 characters is created', () => {
  beforeEach(() => {
    try {
      tweetBody = TweetBody.create({
        body: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      })
    } catch {
    }
  })

  test('Tweetbody construction should have failed', () => {
    expect(tweetBody).not.toBeDefined()
  })
})
