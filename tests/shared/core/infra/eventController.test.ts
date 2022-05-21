import { EventController } from '../../../../src/shared/core/infra/eventController'
import { UserCreatedEvent } from '../../../../src/modules/users/domain/events/UserCreatedEvent'
import { mock, mockReset } from 'jest-mock-extended'
import { User } from '../../../../src/modules/users/domain/user'
import { EventSubscriber } from '../../../../src/shared/core/infra/eventSubscriber'
import { UserDeletedEvent } from '../../../../src/modules/users/domain/events/UserDeletedEvent'

let eventController: EventController
const mockUser = mock<User>()
mockUser.ID.mockReturnValue('1234')
const userCreatedEvent = new UserCreatedEvent(mockUser)
const userDeletedEvent = new UserDeletedEvent(mockUser)
const mockSubscriber = mock<EventSubscriber>()
const mockSubscriber2 = mock<EventSubscriber>()

beforeEach(() => {
  mockReset(mockSubscriber)
  mockReset(mockSubscriber2)
  eventController = new EventController()
})

describe('An event subscriber is added to the controller', () => {
  beforeEach(() => {
    eventController.addSubscriber(UserCreatedEvent, mockSubscriber)
  })

  test('Submitting a message should call the controller', () => {
    eventController.submitMessage(userCreatedEvent)
    expect(mockSubscriber.execute).toHaveBeenCalled()
  })

  describe('A second subscriber is added', () => {
    beforeEach(() => {
      eventController.addSubscriber(UserCreatedEvent, mockSubscriber2)
    })

    test('Submitting a message should call both controllers', () => {
      eventController.submitMessage(userCreatedEvent)
      expect(mockSubscriber.execute).toHaveBeenCalled()
      expect(mockSubscriber2.execute).toHaveBeenCalled()
    })

    describe('First subscriber subscribes to a new event type', () => {
      beforeEach(() => {
        eventController.addSubscriber(UserDeletedEvent, mockSubscriber)
      })

      test('Submitting the messages should result in the correct calls', () => {
        eventController.submitMessage(userDeletedEvent)
        eventController.submitMessage(userCreatedEvent)
        expect(mockSubscriber.execute).toHaveBeenCalledTimes(2)
        expect(mockSubscriber2.execute).toHaveBeenCalledTimes(1)
      })
    })
  })

})
