import { Author } from '../../domain/author'
import { AuthorResponse } from '../dto/authorResponse'

export class AuthorMapper {
  static toDTO(author: Author): AuthorResponse {
    return {
      authorID: author.ID(),
    }
  }
}
