import { FollowingRepository } from '../../infra/followingRepository'
import { TweetRepository } from '../../infra/tweetRepository'
import { TokenAuthentication } from '../../../../shared/core/tokenAuthentication'
import { TweetMapper } from '../../infra/mappers/tweetMapper'
import { AuthorMapper } from '../../infra/mappers/authorMapper'
import { UpdateTweetFeedDTO } from './updateTweetFeedDTO'
import { UpdateTweetFeedResponse } from './updateTweetFeedResponse'
import { AuthorRepository } from '../../infra/authorRepository'

export class UpdateTweetFeedUseCase {
  followingRepository: FollowingRepository
  tweetRepository: TweetRepository
  authorRepository: AuthorRepository

  constructor(followingRepository: FollowingRepository,
              tweetRepository: TweetRepository,
              authorRepository: AuthorRepository) {
    this.followingRepository = followingRepository
    this.tweetRepository = tweetRepository
    this.authorRepository = authorRepository
  }

  execute(reqDTO: UpdateTweetFeedDTO): UpdateTweetFeedResponse {
    const followingRepository = this.followingRepository
    const authorRepository = this.authorRepository
    const tweetRepository = this.tweetRepository

    if (!TokenAuthentication.verify(reqDTO.token, reqDTO.userID)) {
      throw Error('Invalid token')
    }

    const followingListIDs = followingRepository.getFollowing(reqDTO.userID)
      .map((relationship) => relationship.followee())

    const authorList = authorRepository.getByIDs(followingListIDs)
      .filter((author) => author.isViewable())

    const authorListDTO = authorList.map((author) => AuthorMapper.toDTO(author))

    const authorListIDs = authorList.map((author) => author.ID())

    const tweetListDTO = tweetRepository.getTweetsForAuthors(authorListIDs)
      .map((tweet) => TweetMapper.toDTO(tweet))

    return {
      tweets: tweetListDTO,
      authors: authorListDTO,
    }
  }
}
