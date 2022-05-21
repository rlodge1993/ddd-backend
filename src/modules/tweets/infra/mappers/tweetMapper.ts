import { Tweet } from '../../domain/tweet'
import { TweetResponse } from '../../application/getTweetByID/tweetResponse'

export class TweetMapper {
  static toDTO(tweet: Tweet): TweetResponse {
    return {
      tweetID: tweet.ID(),
      tweetBody: tweet.body(),
      authorID: tweet.author(),
    }
  }
}
