import { PostTweetResponse } from './postTweetResponse'
import { PostTweetDTO } from './postTweetDTO'
import { TokenAuthentication } from '../../../../shared/core/tokenAuthentication'
import { Tweet } from '../../domain/tweet'
import { AuthorRepository } from '../../infra/authorRepository'
import { TweetBody } from '../../domain/tweetBody'
import { TweetRepository } from '../../infra/tweetRepository'

export class PostTweetUseCase {
  private readonly tweetRepository: TweetRepository
  private readonly authorRepository: AuthorRepository

  constructor(tweetRepository: TweetRepository, authorRepository: AuthorRepository) {
    this.tweetRepository = tweetRepository
    this.authorRepository = authorRepository
  }

  execute(reqDTO: PostTweetDTO): PostTweetResponse {
    const tweetRepository = this.tweetRepository
    const authorRepository = this.authorRepository

    const isAuthorized = TokenAuthentication.verify(reqDTO.token, reqDTO.authorID)

    if (!isAuthorized) throw Error('Invalid token')

    const author = authorRepository.getByID(reqDTO.authorID)

    if (!author.canTweet()) throw Error('Not authorized to post tweets')

    const tweet = Tweet.create({
      authorID: reqDTO.authorID,
      tweetBody: new TweetBody({
        body: reqDTO.tweetBody,
      }),
    })

    author.incrementTweetCount(1)

    tweetRepository.save(tweet)
    authorRepository.save(author)

    const resDTO: PostTweetResponse = {
      authorID: tweet.author(),
      tweetID: tweet.ID(),
      tweetBody: tweet.body(),
    }

    return resDTO
  }
}
