import * as express from 'express'
import { DomainError } from '../../../domain/domainError'

export abstract class BaseExpressController {
    public success<T>(res: express.Response, dto?: T) {
        if (dto) res.status(200).json(dto)
        else res.sendStatus(200)
    }

    public clientError(res: express.Response, error?: DomainError) {
        const message = error ? error.value() : 'Undefined Error'
        res.status(400).json({ message })
    }
}
