import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

import { ensureAuthenticate } from './middlewares/ensureAuthenticate';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureRequestBody } from './middlewares/ensureRequestBody';

import { userSchema } from './schemas/UserSchema';

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();
export const router = Router();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/login', authenticateUserController.handle);

router.post(
  '/users',
  // ensureRequestBody(userSchema),
  createUserController.handle
);
router.get('/users', listUsersController.handle);
router.get(
  '/users/compliments/send',
  ensureAuthenticate,
  listUserSendComplimentsController.handle
);
router.get(
  '/users/compliments/receive',
  ensureAuthenticate,
  listUserReceiveComplimentsController.handle
);

router.get('/tags', ensureAuthenticate, listTagsController.handle);
router.post(
  '/tags',
  ensureAuthenticate,
  ensureAdmin,
  createTagController.handle
);

router.post(
  '/compliments',
  ensureAuthenticate,
  createComplimentController.handle
);
