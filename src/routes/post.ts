import express, { Request, Response } from 'express';
import { authenticateToken } from "../middleware/authenticateToken";
import { PostController } from '../controllers/postController';
import { validateData } from '../middleware/validateData';
import { PostValidation } from '../utils/validations/postValidation';

const router = express.Router();
const postController = new PostController();

router.post('/api/posts/create',
  (req, res, next) => { authenticateToken(req, res, next) },
  validateData(PostValidation.createPost, "body"),
  async (req: Request, res: Response) => {
    postController.createPost(req, res);
  }
);

router.patch('/api/posts/like',
  (req, res, next) => { authenticateToken(req, res, next) },
  validateData(PostValidation.updateLikes, "body"),
  async (req: Request, res: Response) => {
    postController.updateLikes(req, res);
  }
);

export { router as postRouter };