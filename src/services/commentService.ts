import { Service } from "./service";
import { Comment, IComment } from '../models/comment';
import { Post } from '../models/post';
import mongoose from "mongoose";

class CommentService extends Service {
  constructor() {
    super();
  }

  /**
   * Creates a new comment
   * @param commentData Comment related data
   * @param postId id form the post to comment
   * @returns Comment object
   */
  async createComment(commentData: IComment, postId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const opts = { session };
      const comment = Comment.build(commentData);
      await comment.save(opts);

      const post = await Post.findOne({ _id: postId });

      if (!post)
        throw new Error("Post does not exists");

      post.comments.push(comment._id);
      await post.save(opts);

      await session.commitTransaction();
      session.endSession();

      return comment;
    } catch(err: any) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Error on commentService - createComment - ${err.toString()}`);
    }
  }

}

export { CommentService };
