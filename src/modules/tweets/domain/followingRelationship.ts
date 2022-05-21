import { AggregateRoot } from '../../../shared/domain/aggregateRoot'

interface FollowerProps {
  follower: string,
  followee: string,
  followingSince: Date,
}

export class FollowingRelationship extends AggregateRoot<FollowerProps> {
  private constructor(props: FollowerProps) {
    super(props)
  }

  follower(): string {
    return this.props.follower
  }

  followee(): string {
    return this.props.followee
  }
  
  static create(props: FollowerProps): FollowingRelationship {
    if (props.follower == props.followee) throw Error('You can\'t follow yourself')
    return new FollowingRelationship(props)
  }
}
