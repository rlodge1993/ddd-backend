import { TweetRepository } from '../../infra/tweetRepository'
import { AuthorRepository } from '../../infra/authorRepository'
import { GetTweetsForAuthorDTO } from './getTweetsForAuthorDTO'
import { GetTweetsForAuthorResponse } from './getTweetsForAuthorResponse'

export class GetTweetsForAuthorUseCase {
  tweetRepository: TweetRepository
  authorRepository: AuthorRepository

  constructor(tweetRepository: TweetRepository, authorRepository: AuthorRepository) {
    this.tweetRepository = tweetRepository
    this.authorRepository = authorRepository
  }

  execute(reqDTO: GetTweetsForAuthorDTO): GetTweetsForAuthorResponse {
    // TODO: Check credentials of requesting user

    const tweetRepository = this.tweetRepository

    const resDTO = tweetRepository.getTweetsForAuthor(reqDTO.authorID)

    // TODO: Check if tweet author is viewable

    return resDTO
  }
}
