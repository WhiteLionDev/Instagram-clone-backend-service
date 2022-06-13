import { Request, Response } from 'express';
import { Controller } from './controller';
import { CommentService } from '../services/commentService';

class CommentController extends Controller {
  constructor() {
    super();
  }

  /**
   * Creates a new comment
   * @param req 
   * @param res 
   */
  async createComment(req: Request, res: Response) {
    try {
      const { userId, postId, description } = req.body;

      const commentService = new CommentService();

      const commentData = {
        user: userId,
        description: description.slice(0, 100),
      };

      const comment = await commentService.createComment(commentData, postId);

      this.apiResponse.ok(res, { comment });

    } catch (err: any) {
      this.apiResponse.internalServerError(res, err.toString());
    }
  };

}

export { CommentController };