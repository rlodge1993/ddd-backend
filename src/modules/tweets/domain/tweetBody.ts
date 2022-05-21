import { ValueObject } from '../../../shared/domain/valueObject'

interface TweetBodyProps {
  body: string,
}

export class TweetBody extends ValueObject<TweetBodyProps>{
  constructor(props: TweetBodyProps) {
    super(props)
  }

  value(): string {
    return this.props.body
  }

  static create(props: TweetBodyProps) {
    if(props.body.length > 140) throw Error('Tweet too long')
    return new TweetBody(props)
  }
}
