import mongoose from "mongoose";

interface IComment {
  user: string;
  description: string;
};

interface CommentModelInterface extends mongoose.Model<CommentDoc> {
  build(attr: IComment): CommentDoc;
}

interface CommentDoc extends mongoose.Document {
  user: string;
  description: string;
}

const commmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

commmentSchema.statics.build = (attr: IComment) => {
  return new Comment(attr);
};

const Comment = mongoose.model<CommentDoc, CommentModelInterface>('Comment', commmentSchema);

export { Comment, IComment };
