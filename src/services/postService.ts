import { Service } from "./service";
import { Post, IPost } from '../models/post';

class PostService extends Service {
  constructor() {
    super();
  }

  /**
   * Creates a new post
   * @param postData Post related data
   * @returns Post object
   */
  async createPost(postData: IPost) {
    try {
      const post = Post.build(postData);
      await post.save();

      return post;
    } catch(err: any) {
      throw new Error(`Error on postService - createPost - ${err.toString()}`);
    }
  }

  /**
   * Like or dislikes a post
   * @param userId id from the user who likes/dislikes the post
   * @param postId id from the post to like/unlike
   * @returns Likes quantity
   */
  async updateLikes(userId: string, postId: string) {
    try {
      const post = await Post.findOne({ _id: postId });

      if (!post)
        throw new Error("Post does not exists");

      const existingLikeIndex = post.likes.findIndex((id) => id.toString() === userId);

      if (existingLikeIndex >= 0) {
        post.likes.splice(existingLikeIndex, 1);
      }
      else {
        post.likes.push(userId);
      }

      await post.save();

      return post.likes.length;
    } catch(err: any) {
      throw new Error(`Error on postService - updateLikes - ${err.toString()}`);
    }
  }

}

export { PostService };
