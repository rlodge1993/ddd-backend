import { BaseExpressController } from '../../../../shared/core/infra/http/baseExpressController'
import { UpdateTweetFeedUseCase } from './updateTweetFeedUseCase'
import { Request, Response } from 'express'
import { UpdateTweetFeedDTO } from './updateTweetFeedDTO'

export class UpdateTweetFeedController extends BaseExpressController {
  useCase: UpdateTweetFeedUseCase

  constructor(useCase: UpdateTweetFeedUseCase) {
    super()
    this.useCase = useCase
  }

  execute(req: Request, res: Response) {
    const reqDTO: UpdateTweetFeedDTO = {
      userID: req.body.userID,
      token: req.body.token,
    }

    try {
      const result = this.useCase.execute(reqDTO)
      this.success(res, result)
    } catch (err) {
      this.clientError(res)
      console.log(err)
    }
  }
}
