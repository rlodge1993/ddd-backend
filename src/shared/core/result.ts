import { DomainError } from '../domain/domainError'

interface ResultParams<T> {
    value?: T
    error?: DomainError
    isSuccess: boolean
}

export class Result<T> {
    private readonly value: T
    private readonly error: DomainError
    private readonly _isSuccess: boolean

    private constructor({ value, error, isSuccess }: ResultParams<T>) {
        if (error) this.error = error
        if (value) this.value = value
        this._isSuccess = isSuccess
    }

    isSuccess(): boolean {
        return this._isSuccess
    }

    isError(): boolean {
        return !this._isSuccess
    }

    getValue(): T {
        if (!this.isSuccess()) throw Error('Attempted to access value in failed state.')
        return this.value
    }

    getError(): DomainError {
        if (!this.isError()) throw Error('Attempted to access error in successful state.')
        return this.error
    }

    static createSuccess<U>(value: U) {
        return new Result<U>({ value: value, isSuccess: true })
    }

    static createEmptySuccess() {
        return new Result<void>({ isSuccess: true })
    }

    static createError<T>(error?: string): Result<T> {
        const returnError = new DomainError(error)
        return new Result<T>({ error: returnError, isSuccess: false })
    }

    static passError<T, U>(result: Result<T>): Result<U> {
        return new Result({ error: result.getError(), isSuccess: false })
    }

    static combine(results: Result<any>[]): Result<void> {
        for (const result of results) {
            if (result.isError()) return result
        }
        return Result.createEmptySuccess()
    }
}
