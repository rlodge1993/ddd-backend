import { Tweet } from '../domain/tweet'
import { TweetResponse } from '../application/getTweetByID/tweetResponse'
import { GetTweetsForAuthorResponse } from '../application/getTweetsForAuthor/getTweetsForAuthorResponse'

export interface TweetRepository {
  save(tweet: Tweet): void

  getByID(id: string): TweetResponse

  getTweetsForAuthor(authorID: string): GetTweetsForAuthorResponse

  getTweetsForAuthors(authorIDs: string[]): Tweet[]
}
