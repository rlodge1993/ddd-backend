import { Author } from '../../../../src/modules/tweets/domain/author'

let author: Author

describe('An author is created', () => {
  beforeEach(() => {
    author = Author.create({id: '1234'})
  })

  test('Id should match factory params', () => {
    expect(author.ID().toString()).toBe('1234')
  })

  test('The author\'s tweet count should be accessible', () => {
    expect(author.tweetCount()).toEqual(0)
  })

  test('Incrementing the tweet count should work', () => {
    author.incrementTweetCount(5)
    expect(author.tweetCount()).toEqual(5)
  })

  test('Decrementing the tweet count should work', () => {
    author.incrementTweetCount(5)
    expect(author.tweetCount()).toEqual(5)
    author.decrementTweetCount(3)
    expect(author.tweetCount()).toEqual(2)
  })

  test('Decrement should not underflow', () => {
    author.decrementTweetCount(5)
    expect(author.tweetCount()).toEqual(0)
  })
})
