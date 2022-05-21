import { BaseExpressController } from '../../../../shared/core/infra/http/baseExpressController'
import { GetUserByIdUseCase } from './getUserByIdUseCase'
import * as express from 'express'

export class GetUserByIdController extends BaseExpressController {
  useCase: GetUserByIdUseCase

  constructor(useCase: GetUserByIdUseCase) {
    super()
    this.useCase = useCase
  }

  execute(req: express.Request, res: express.Response): any {
    const reqDTO = {
      id: req.body.id,
    }

    try {
      const result = this.useCase.execute(reqDTO)

      if (result.isError()) {
        return this.clientError(res, result.getError())
      }

      const resDTO = result.getValue()

      return this.success(res, resDTO)
    } catch {
      return this.clientError(res)
    }
  }
}
