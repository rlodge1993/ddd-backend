import { AggregateRoot } from '../../../shared/domain/aggregateRoot'
import { UniqueID } from '../../../shared/domain/uniqueID'

interface AuthorProps {
  id: string,
  tweetCount?: number,
  isDeleted?: boolean,
  isBanned?: boolean,
}

export class Author extends AggregateRoot<AuthorProps> {
  private constructor(props: AuthorProps, id?: UniqueID) {
    super(props, id)
  }

  canTweet(): boolean {
    return true
  }

  tweetCount(): number {
    return this.props.tweetCount ?? 0
  }

  private setTweetCount(value: number): void {
    this.props.tweetCount = value
  }

  incrementTweetCount(value: number) : void {
    const newValue = this.tweetCount() + value
    this.setTweetCount(newValue)
  }

  decrementTweetCount(value: number): void {
    const newValue = Math.max(this.tweetCount() - value, 0)
    this.setTweetCount(newValue)
  }

  isViewable(): boolean {
    if (this.props.isDeleted) return false
    if (this.props.isBanned) return false
    return true
  }

  static create(props: AuthorProps): Author {
    const id = UniqueID.create(props.id)
    return new Author(props, id)
  }
}
