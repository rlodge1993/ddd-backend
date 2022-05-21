import { Author } from '../domain/author'
import { AuthorRepository } from './authorRepository'

export class InMemoryAuthorRepository implements AuthorRepository {
  authors: Author[] = []

  exists(id: string): boolean {
    for (const author of this.authors) {
      if (author.ID() == id) return true
    }
    return false
  }

  getByID(id: string): Author {
    for (const author of this.authors) {
      if (author.ID() == id) return author
    }
    throw Error('Author not found')
  }

  getByIDs(ids: string[]): Author[] {
    const authors: Author[] = []
    for (const author of this.authors) {
      if (ids.includes(author.ID())) authors.push(author)
    }
    return authors
  }

  save(author: Author): void {
    for (let repoAuthor of this.authors) {
      if (author.ID() == repoAuthor.ID()) {
        repoAuthor = author
        return
      }
    }
    this.authors.push(author)
  }
}
