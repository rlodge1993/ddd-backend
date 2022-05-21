import { Author } from '../domain/author'

export interface AuthorRepository {
  getByID(id: string): Author
  getByIDs(ids: string[]): Author[]
  exists(id: string): boolean
  save(author: Author): void
}

