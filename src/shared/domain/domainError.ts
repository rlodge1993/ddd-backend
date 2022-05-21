export class DomainError {
    protected message: string
    protected defaultMessage = 'Unspecified error'

    constructor(message?: string) {
        if (message) this.message = message
    }

    value(): string {
        if (this.message) return this.message
        else return this.defaultMessage
    }
}
