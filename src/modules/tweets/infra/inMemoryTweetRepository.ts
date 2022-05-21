import { Tweet } from '../domain/tweet'
import { TweetRepository } from './tweetRepository'
import { TweetResponse } from '../application/getTweetByID/tweetResponse'
import { GetTweetsForAuthorResponse } from '../application/getTweetsForAuthor/getTweetsForAuthorResponse'

export class InMemoryTweetRepository implements TweetRepository {
  tweets: Tweet[] = []

  getByID(id: string): TweetResponse {
    for (const tweet of this.tweets) {
      if (tweet.ID() == id) {
        return {
          tweetID: tweet.ID(),
          tweetBody: tweet.body(),
          authorID: tweet.author(),
        }
      }
    }
    throw Error('Tweet not found')
  }

  getTweetsForAuthor(authorID: string): GetTweetsForAuthorResponse {
    const resTweets: TweetResponse[] = []
    for (const tweet of this.tweets) {
      if (tweet.author() == authorID) {
        resTweets.push({
          tweetID: tweet.ID(),
          tweetBody: tweet.body(),
          authorID: tweet.author(),
        })
      }
    }
    return { tweets: resTweets }
  }

  getTweetsForAuthors(authorIDs: string[]): Tweet[] {
    const tweets: Tweet[] = []
    for (const tweet of this.tweets) {
      if (authorIDs.includes(tweet.author())) tweets.push(tweet)
    }
    return tweets
  }

  save(tweet: Tweet): void {
    for (let repoTweet of this.tweets) {
      if (repoTweet.ID() == tweet.ID()) {
        repoTweet = tweet
        return
      }
    }
    this.tweets.push(tweet)
  }
}
