import { FollowingRepository } from './followingRepository'
import { FollowingRelationship } from '../domain/followingRelationship'

export class InMemoryFollowingRepository implements FollowingRepository {
  private followingRelationships: FollowingRelationship[] = []

  exists(relationship: FollowingRelationship): boolean {
    for (const followingRelationship of this.followingRelationships) {
      if (relationship.follower() == followingRelationship.follower() && relationship.followee() == followingRelationship.followee()) {
        return true
      }
    }
    return false
  }

  getFollowing(userID: string): FollowingRelationship[] {
    const relationships: FollowingRelationship[] = []
    for (const relationship of this.followingRelationships) {
      if (relationship.follower() == userID) relationships.push(relationship)
    }
    return relationships
  }

  save(relationship: FollowingRelationship) {
    for (let followingRelationship of this.followingRelationships) {
      if (relationship.ID() == followingRelationship.ID()) {
        followingRelationship = relationship
      }
    }
    this.followingRelationships.push(relationship)
  }
}
