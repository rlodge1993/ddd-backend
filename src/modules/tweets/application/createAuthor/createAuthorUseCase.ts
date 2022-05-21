import { CreateAuthorDTO } from './createAuthorDTO'
import { Author } from '../../domain/author'
import { AuthorRepository } from '../../infra/authorRepository'

export class CreateAuthorUseCase {
  authorRepository: AuthorRepository

  constructor(authorRepository: AuthorRepository) {
    this.authorRepository = authorRepository
  }

  execute(reqDTO: CreateAuthorDTO): void {
    const authorRepository = this.authorRepository

    if (authorRepository.exists(reqDTO.id)) throw Error('Author already exists')

    const author = Author.create({
      id: reqDTO.id,
    })

    authorRepository.save(author)
  }
}
