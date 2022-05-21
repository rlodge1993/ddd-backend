import { AggregateRoot } from '../../../shared/domain/aggregateRoot'
import { UniqueID } from '../../../shared/domain/uniqueID'
import { TweetBody } from './tweetBody'

export interface TweetProps {
  authorID: string,
  tweetBody: TweetBody,
}

export class Tweet extends AggregateRoot<TweetProps> {
  constructor(props: TweetProps, id?: UniqueID) {
    super(props, id)
  }

  author(): string {
    return this.props.authorID
  }

  body(): string {
    return this.props.tweetBody.value()
  }

  static create(props: TweetProps, id?: UniqueID): Tweet {
    return new Tweet(props, id)
  }
}
