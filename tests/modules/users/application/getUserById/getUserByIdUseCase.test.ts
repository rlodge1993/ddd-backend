import { GetUserByIdUseCase } from '../../../../../src/modules/users/application/getUserById/getUserByIdUseCase'
import { UserRepository } from '../../../../../src/modules/users/infra/userRepository'
import { mock } from 'jest-mock-extended'
import { GetUserByIdResponse } from '../../../../../src/modules/users/application/getUserById/getUserByIdResponse'
import { Result } from '../../../../../src/shared/core/result'

const mockRepo = mock<UserRepository>()
const useCase = new GetUserByIdUseCase(mockRepo)
const responseDTO: GetUserByIdResponse = { username: 'Ryan' }
let result: Result<GetUserByIdResponse>

describe('An ID for an existing user is provided', () => {
    beforeEach(() => {
        mockRepo.getUserByIdDTO.mockReturnValue(Result.createSuccess(responseDTO))
        result = useCase.execute({ id: '' })
    })

    test('A successful result should be returned', () => {
        expect(result.isSuccess()).toBe(true)
    })

    test('Successful result should contain DTO from the Repository', () => {
        expect(result.getValue()).toBe(responseDTO)
    })
})

describe('An ID for a user that does not exist is provided', () => {
    beforeEach(() => {
        mockRepo.getUserByIdDTO.mockReturnValue(Result.createError())
        result = useCase.execute({ id: '' })
    })

    test('An error should be returned', () => {
        expect(result.isError()).toBe(true)
    })
})
