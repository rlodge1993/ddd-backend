import { BaseExpressController } from '../../../../shared/core/infra/http/baseExpressController'
import { GetTweetByIDUseCase } from './getTweetByIDUseCase'
import { Request, Response } from 'express'
import { GetTweetByIDDTO } from './getTweetByIDDTO'

export class GetTweetByIDController extends BaseExpressController {
  private useCase: GetTweetByIDUseCase

  constructor(useCase: GetTweetByIDUseCase) {
    super()
    this.useCase = useCase
  }

  execute(req: Request, res: Response) {
    const reqDTO: GetTweetByIDDTO = {
      tweetID: req.body.tweetID,
      authorID: req.body?.authorID,
      token: req.body?.token,
    }

    try {
      const result = this.useCase.execute(reqDTO)
      this.success(res, result)
    } catch {
      this.clientError(res)
    }
  }
}
