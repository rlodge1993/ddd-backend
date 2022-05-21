import { mock, mockReset } from 'jest-mock-extended'
import { UserRepository } from '../../../../../src/modules/users/infra/userRepository'
import { LoginUseCase } from '../../../../../src/modules/users/application/login/loginUseCase'
import { LoginDTO } from '../../../../../src/modules/users/application/login/loginDTO'
import { Result } from '../../../../../src/shared/core/result'
import { User } from '../../../../../src/modules/users/domain/user'
import { LoginResponse } from '../../../../../src/modules/users/application/login/loginResponse'
import { BcryptPassword } from '../../../../../src/modules/users/domain/bcryptPassword'
import { Username } from '../../../../../src/modules/users/domain/username'

process.env.JWT_SECRET = 'secret'
const mockRepository = mock<UserRepository>()
const useCase = new LoginUseCase(mockRepository)
const mockUser = mock<User>()
const mockUsername = mock<Username>()
const mockPassword = mock<BcryptPassword>()
const getByUsernameResponse = Result.createSuccess(
  mockUser,
)
let reqDTO: LoginDTO
let result: Result<LoginResponse>

beforeEach(() => {
  mockReset(mockRepository)
  mockReset(mockUser)
  mockReset(mockPassword)
  mockRepository.getByUsername.mockReturnValue(getByUsernameResponse)
  mockRepository.getByEmail.mockReturnValue(getByUsernameResponse)
  mockUser.password.mockReturnValue(mockPassword)
  mockUser.ID.mockReturnValue('id')
  mockUser.username.mockReturnValue(mockUsername)
  reqDTO = {
    password: 'password',
  }
})

describe('User submits a valid DTO', () => {
  describe('DTO contains Username', () => {
    beforeEach(() => {
      reqDTO.username = 'ryan'
    })

    describe('User exists', () => {
      describe('Password matches', () => {
        beforeEach(async () => {
          // @ts-ignore
          mockPassword.matches.mockReturnValue(true)
          result = await useCase.execute(reqDTO)
        })

        test('Result should be a success', () => {
          expect(result.isSuccess()).toBe(true)
        })

        test('Should be issued an auth token', () => {
          expect(result.getValue().token).toBe('eyJhbGciOiJIUzI1NiJ9.aWQ.OpedrMFQDgIqi0Kx1rP9zXDICUqfVtEUbGLhbppqfAw')
        })
      })

      describe('Password doesn\'t match', () => {
        beforeEach(async () => {
          // @ts-ignore
          mockPassword.matches.mockReturnValue(false)
          result = await useCase.execute(reqDTO)
        })

        test('Should result in an error', () => {
          expect(result.isError()).toBe(true)
        })
      })
    })

    describe('User doesn\'t exist', () => {
      beforeEach(async () => {
        mockRepository.getByUsername.mockReturnValue(Result.createError())
        result = await useCase.execute(reqDTO)
      })

      test('Result should be an error', () => {
        expect(result.isError()).toBe(true)
      })
    })
  })

  describe('DTO contains Email', () => {
    beforeEach(() => {
      reqDTO.email = 'ryan@ryan.com'
    })

    describe('Email exists', () => {
      describe('Passwords match', () => {
        beforeEach(async () => {
          // @ts-ignore
          mockPassword.matches.mockReturnValue(true)
          result = await useCase.execute(reqDTO)
        })

        test('Result should be a success', () => {
          expect(result.isSuccess()).toBe(true)
        })
      })
    })

    describe('Email doesn\'t exist', () => {
      beforeEach(async () => {
        mockRepository.getByEmail.mockReturnValue(Result.createError())
        result = await useCase.execute(reqDTO)
      })

      test('Result should be an error', () => {
        expect(result.isError()).toBe(true)
      })
    })
  })
})

describe('User submits an invalid DTO', () => {
  describe('Username and email are missing', () => {
    beforeEach(async () => {
      result = await useCase.execute(reqDTO)
    })

    test('Result should be an error', () => {
      expect(result.isError()).toBe(true)
    })
  })

  describe('Username is invalid', () => {
    beforeEach(async () => {
      reqDTO.username = 'As'
      result = await useCase.execute(reqDTO)
    })

    test('Result should be an error', () => {
      expect(result.isError()).toBe(true)
    })
  })

  describe('Email is invalid', () => {
    beforeEach(async () => {
      reqDTO.email = 'ryan.com'
      result = await useCase.execute(reqDTO)
    })

    test('Result should be an error', () => {
      expect(result.isError()).toBe(true)
    })
  })
})
