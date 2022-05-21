import { AuthorRepository } from '../../infra/authorRepository'
import { TweetRepository } from '../../infra/tweetRepository'
import { GetTweetByIDDTO } from './getTweetByIDDTO'
import { TweetResponse } from './tweetResponse'

export class GetTweetByIDUseCase {
  authorRepository: AuthorRepository
  tweetRepository: TweetRepository

  constructor(authorRepository: AuthorRepository, tweetRepository: TweetRepository) {
    this.authorRepository = authorRepository
    this.tweetRepository = tweetRepository
  }

  execute(reqDTO: GetTweetByIDDTO): TweetResponse {
    // TODO: check credentials of requesting user

    const tweetRepository = this.tweetRepository

    const resTweetDTO = tweetRepository.getByID(reqDTO.tweetID)

    // TODO: Check if tweet author is viewable

    return resTweetDTO
  }
}
