import { BaseExpressController } from '../../../../shared/core/infra/http/baseExpressController'
import { FollowAuthorUseCase } from './followAuthorUseCase'
import { Request, Response } from 'express'
import { FollowAuthorDTO } from './followAuthorDTO'

export class FollowAuthorController extends BaseExpressController {
  useCase: FollowAuthorUseCase

  constructor(useCase: FollowAuthorUseCase) {
    super()
    this.useCase = useCase
  }

  execute(req: Request, res: Response) {
    const reqDTO: FollowAuthorDTO = {
      authorID: req.body.authorID,
      token: req.body.token,
      userID: req.body.userID,
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
