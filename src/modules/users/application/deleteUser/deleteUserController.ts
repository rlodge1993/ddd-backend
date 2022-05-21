import { BaseExpressController } from '../../../../shared/core/infra/http/baseExpressController'
import { DeleteUserUseCase } from './deleteUserUseCase'
import { Request, Response } from 'express'
import { DeleteUserDTO } from './deleteUserDTO'

export class DeleteUserController extends BaseExpressController {
  useCase: DeleteUserUseCase

  constructor(useCase: DeleteUserUseCase) {
    super()
    this.useCase = useCase
  }

  execute(req: Request, res: Response): any {
    const reqDTO: DeleteUserDTO = {
      id: req.body.ID,
      token: req.body.token,
    }

    try {
      const result = this.useCase.execute(reqDTO)

      if (result.isError()) {
        return this.clientError(res, result.getError())
      }

      const resDTO = result.getValue()

      return this.success(res, resDTO)
    } catch {
      this.clientError(res)
    }
  }
}
