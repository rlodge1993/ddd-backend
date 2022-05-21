import { BaseExpressController } from '../../../../shared/core/infra/http/baseExpressController'
import { Request, Response } from 'express'
import { GetTweetsForAuthorDTO } from './getTweetsForAuthorDTO'
import { GetTweetsForAuthorUseCase } from './getTweetsForAuthorUseCase'

export class GetTweetsForAuthorController extends BaseExpressController {
  useCase: GetTweetsForAuthorUseCase

  constructor(useCase: GetTweetsForAuthorUseCase) {
    super()
    this.useCase = useCase
  }

  execute(req: Request, res: Response) {
    const reqDTO: GetTweetsForAuthorDTO = {
      authorID: req.body.authorID,
      userID: req.body.userID,
      token: req.body.token,
    }

    try {
      const result = this.useCase.execute(reqDTO)
      this.success(res, result)
    } catch {
      this.clientError(res)
    }
  }
}
