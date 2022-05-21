import { CreateUserUseCase } from './createUserUseCase'
import * as express from 'express'
import { CreateUserDTO } from './createUserDTO'
import { BaseExpressController } from '../../../../shared/core/infra/http/baseExpressController'

export class CreateUserController extends BaseExpressController {
  useCase: CreateUserUseCase

  constructor(useCase: CreateUserUseCase) {
    super()
    this.useCase = useCase
  }

  async execute(req: express.Request, res: express.Response): Promise<any> {
    const reqDTO: CreateUserDTO = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }

    try {
      const result = await this.useCase.execute(reqDTO)

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
