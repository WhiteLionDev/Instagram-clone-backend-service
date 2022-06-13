import express, { Request, Response } from 'express';
import { authenticateToken } from "../middleware/authenticateToken";
import { UserController } from '../controllers/userController';
import { validateData } from '../middleware/validateData';
import { UserValidation } from '../utils/validations/userValidation';

const router = express.Router();
const userController = new UserController();

router.get('/api/users/info',
  (req, res, next) => { authenticateToken(req, res, next) },
  validateData(UserValidation.retrieveInfo, "params"),
  async (req: Request, res: Response) => {
    userController.retrieveInfo(req, res);
  }
);

router.get('/api/users/signIn',
  validateData(UserValidation.signIn, "query"),
  async (req: Request, res: Response) => {
    userController.signIn(req, res);
  }
);

router.post('/api/users/signUp',
  validateData(UserValidation.signUp, "body"),
  async (req: Request, res: Response) => {
    userController.signUp(req, res);
  }
);

router.patch('/api/users/follow',
  (req, res, next) => { authenticateToken(req, res, next) },
  validateData(UserValidation.updateFollowers, "body"),
  async (req: Request, res: Response) => {
    userController.updateFollows(req, res);
  }
);

export { router as userRouter };