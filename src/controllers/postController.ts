import { Request, Response } from 'express';
import { Controller } from './controller';
import { PostService } from '../services/postService';

class PostController extends Controller {
  constructor() {
    super();
  }

  /**
   * Creates a new post
   * @param req 
   * @param res 
   */
  async createPost(req: Request, res: Response) {
    try {
      const { userId, description } = req.body;

      const postService = new PostService();

      const postData = {
        user: userId,
        description
      };

      const post = await postService.createPost(postData);

      this.apiResponse.ok(res, { post });

    } catch (err: any) {
      this.apiResponse.internalServerError(res, err.toString());
    }
  };

  /**
   * Likes or dislikes a post
   * @param req 
   * @param res 
   */
  async updateLikes(req: Request, res: Response) {
    try {
      const { userId, postId } = req.body;

      const postService = new PostService();

      const likesCount = await postService.updateLikes(userId, postId);

      this.apiResponse.ok(res, { likes: likesCount });

    } catch (err: any) {
      this.apiResponse.internalServerError(res, err.toString());
    }
  };
}

export { PostController };