import express, { Request, Response } from 'express';
import { authenticateToken } from "../middleware/authenticateToken";
import { CommentController } from '../controllers/commentController';
import { validateData } from '../middleware/validateData';
import { CommentValidation } from '../utils/validations/commentValidation';

const router = express.Router();
const commentController = new CommentController();

router.post('/api/comments/create',
  (req, res, next) => { authenticateToken(req, res, next) },
  validateData(CommentValidation.createComment, "body"),
  async (req: Request, res: Response) => {
    commentController.createComment(req, res);
  }
);

export { router as commentRouter };