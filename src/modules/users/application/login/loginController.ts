import { BaseExpressController } from '../../../../shared/core/infra/http/baseExpressController'
import { Request, Response } from 'express'
import { LoginUseCase } from './loginUseCase'
import { LoginDTO } from './loginDTO'
import { LoginResponse } from './loginResponse'

export class LoginController extends BaseExpressController {
  private useCase: LoginUseCase

  constructor(useCase: LoginUseCase) {
    super()
    this.useCase = useCase
  }

  async execute(req: Request, res: Response): Promise<any> {
    const reqDTO: LoginDTO = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }

    try {
      const result = await this.useCase.execute(reqDTO)

      if (result.isError()) {
        return this.clientError(res, result.getError())
      }

      const resDTO: LoginResponse = result.getValue()

      this.success(res, resDTO)
    } catch {
      this.clientError(res)
    }
  }
}
