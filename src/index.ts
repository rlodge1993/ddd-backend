import Express from 'express'
import { UserRepository } from './modules/users/infra/userRepository'
import { CreateUserUseCase } from './modules/users/application/createUser/createUserUseCase'
import { CreateUserController } from './modules/users/application/createUser/createUserController'
import { InMemoryUserRepository } from './modules/users/infra/inMemoryUserRepository'
import { GetUserByIdUseCase } from './modules/users/application/getUserById/getUserByIdUseCase'
import { GetUserByIdController } from './modules/users/application/getUserById/getUserByIdController'
import { LoginUseCase } from './modules/users/application/login/loginUseCase'
import { LoginController } from './modules/users/application/login/loginController'
import { DeleteUserUseCase } from './modules/users/application/deleteUser/deleteUserUseCase'
import { DeleteUserController } from './modules/users/application/deleteUser/deleteUserController'
import { CreateAuthorUseCase } from './modules/tweets/application/createAuthor/createAuthorUseCase'
import { AuthorRepository } from './modules/tweets/infra/authorRepository'
import { CreateAuthorEventSubscriber } from './modules/tweets/application/createAuthor/createAuthorEventSubscriber'
import { EventController } from './shared/core/infra/eventController'
import { UserCreatedEvent } from './modules/users/domain/events/UserCreatedEvent'
import { PostTweetUseCase } from './modules/tweets/application/postTweet/postTweetUseCase'
import { InMemoryTweetRepository } from './modules/tweets/infra/inMemoryTweetRepository'
import { InMemoryAuthorRepository } from './modules/tweets/infra/inMemoryAuthorRepository'
import { TweetRepository } from './modules/tweets/infra/tweetRepository'
import { PostTweetController } from './modules/tweets/application/postTweet/postTweetController'
import { GetTweetByIDUseCase } from './modules/tweets/application/getTweetByID/getTweetByIDUseCase'
import { GetTweetByIDController } from './modules/tweets/application/getTweetByID/getTweetByIDController'
import { GetTweetsForAuthorUseCase } from './modules/tweets/application/getTweetsForAuthor/getTweetsForAuthorUseCase'
import {
  GetTweetsForAuthorController
} from './modules/tweets/application/getTweetsForAuthor/getTweetsForAuthorController'
import { FollowAuthorUseCase } from './modules/tweets/application/followAuthor/followAuthorUseCase'
import { FollowingRepository } from './modules/tweets/infra/followingRepository'
import { InMemoryFollowingRepository } from './modules/tweets/infra/inMemoryFollowingRepository'
import { FollowAuthorController } from './modules/tweets/application/followAuthor/followAuthorController'
import { UpdateTweetFeedUseCase } from './modules/tweets/application/updateTweetFeed/updateTweetFeedUseCase'
import { UpdateTweetFeedController } from './modules/tweets/application/updateTweetFeed/updateTweetFeedController'

const app = Express()

const port = process.env.PORT

const userRepo: UserRepository = new InMemoryUserRepository()
const authorRepo: AuthorRepository = new InMemoryAuthorRepository()
const tweetRepo: TweetRepository = new InMemoryTweetRepository()
const followingRepo: FollowingRepository = new InMemoryFollowingRepository()

const eventController = new EventController()

const createUserUseCase = new CreateUserUseCase(userRepo, eventController)
const createUserController = new CreateUserController(createUserUseCase)

const getUserByIdUseCase = new GetUserByIdUseCase(userRepo)
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

const loginUseCase = new LoginUseCase(userRepo)
const loginController = new LoginController(loginUseCase)

const deleteUserUseCase = new DeleteUserUseCase(userRepo)
const deleteUserController = new DeleteUserController(deleteUserUseCase)

const createAuthorUserCase = new CreateAuthorUseCase(authorRepo)
const createAuthorEventSubscriber = new CreateAuthorEventSubscriber(createAuthorUserCase)
eventController.addSubscriber(UserCreatedEvent, createAuthorEventSubscriber)

const postTweetUseCase = new PostTweetUseCase(tweetRepo, authorRepo)
const postTweetController = new PostTweetController(postTweetUseCase)

const getTweetByIDUseCase = new GetTweetByIDUseCase(authorRepo, tweetRepo)
const getTweetByIDController = new GetTweetByIDController(getTweetByIDUseCase)

const getTweetsForAuthorUseCase = new GetTweetsForAuthorUseCase(tweetRepo, authorRepo)
const getTweetsForAuthorController = new GetTweetsForAuthorController(getTweetsForAuthorUseCase)

const followAuthorUseCase = new FollowAuthorUseCase(followingRepo, authorRepo)
const followAuthorController = new FollowAuthorController(followAuthorUseCase)

const updateTweetFeedUseCase = new UpdateTweetFeedUseCase(followingRepo, tweetRepo, authorRepo)
const updateTweetFeedController = new UpdateTweetFeedController(updateTweetFeedUseCase)

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

app.post('/', (req, res) => {
  createUserController.execute(req, res)
})

app.get('/', (req, res) => {
  getUserByIdController.execute(req, res)
})

app.post('/user', (req, res) => {
  loginController.execute(req, res)
})

app.delete('/user', (req, res) => {
  deleteUserController.execute(req, res)
})

app.post('/tweet', (req, res) => {
  postTweetController.execute(req, res)
})

app.get('/tweet', (req, res) => {
  getTweetByIDController.execute(req, res)
})

app.get('/tweets', (req, res) => {
  getTweetsForAuthorController.execute(req, res)
})

app.get('/follow', (req, res) => {
  followAuthorController.execute(req, res)
})

app.get('/feed', (req, res) => {
  updateTweetFeedController.execute(req, res)
})

app.listen(port)

console.log('Running server')
