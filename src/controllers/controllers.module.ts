import { PostController } from './postController';
import {TestController} from './testController';
import { UserController } from './userController';

export const testController = new TestController();
export const userController = new UserController();
export const postController = new PostController();