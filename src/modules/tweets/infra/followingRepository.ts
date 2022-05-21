import { FollowingRelationship } from '../domain/followingRelationship'

export interface FollowingRepository {
  exists(relationship: FollowingRelationship): boolean

  save(follower: FollowingRelationship): void

  getFollowing(userID: string): FollowingRelationship[]
}
