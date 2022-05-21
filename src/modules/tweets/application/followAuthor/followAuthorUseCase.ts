import { FollowingRelationship } from '../../domain/followingRelationship'
import { TokenAuthentication } from '../../../../shared/core/tokenAuthentication'
import { FollowingRepository } from '../../infra/followingRepository'
import { FollowAuthorDTO } from './followAuthorDTO'
import { FollowAuthorResponse } from './followAuthorResponse'
import { AuthorRepository } from '../../infra/authorRepository'

export class FollowAuthorUseCase {
  followingRepository: FollowingRepository
  authorRepository: AuthorRepository

  constructor(followingRepository: FollowingRepository, authorRepository: AuthorRepository) {
    this.followingRepository = followingRepository
    this.authorRepository = authorRepository
  }

  execute(reqDTO: FollowAuthorDTO): FollowAuthorResponse {
    const followingRepository = this.followingRepository
    const authorRepository = this.authorRepository

    if (!TokenAuthentication.verify(reqDTO.token, reqDTO.userID)) {
      throw Error('Invalid token')
    }

    if (!authorRepository.exists(reqDTO.authorID)) throw Error('User doesn\'t exist')

    const followingRelationship = FollowingRelationship.create({
      follower: reqDTO.userID,
      followee: reqDTO.authorID,
      followingSince: new Date(),
    })

    if (followingRepository.exists(followingRelationship)) {
      throw Error('You are already following this user')
    }

    followingRepository.save(followingRelationship)

    return {
      followerID: followingRelationship.follower(),
      followeeID: followingRelationship.followee(),
    }
  }
}
