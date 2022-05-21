import { BaseExpressController } from '../../../../shared/core/infra/http/baseExpressController'
import { PostTweetUseCase } from './postTweetUseCase'
import { Request, Response } from 'express'

export class PostTweetController extends BaseExpressController {
  useCase: PostTweetUseCase

  constructor(useCase: PostTweetUseCase) {
    super()
    this.useCase = useCase
  }

  execute(req: Request, res: Response) {
    try {
      const result = this.useCase.execute({
        tweetBody: req.body.tweetBody,
        authorID: req.body.authorID,
        token: req.body.token,
      })

      this.success(res, result)

    } catch (err) {
      this.clientError(res)
    }
  }
}
