import { TweetResponse } from '../getTweetByID/tweetResponse'
import { AuthorResponse } from '../../infra/dto/authorResponse'

export interface UpdateTweetFeedResponse {
  tweets: TweetResponse[],
  authors: AuthorResponse[],
}
