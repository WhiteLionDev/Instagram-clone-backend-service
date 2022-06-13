import mongoose from "mongoose";

interface IPost {
  user: string;
  description: string;
  comments?: Array<string>;
  likes?: Array<string>;
};

interface PostModelInterface extends mongoose.Model<PostDoc> {
  build(attr: IPost): PostDoc;
}

interface PostDoc extends mongoose.Document {
  user: string;
  description: string;
  comments: Array<string>;
  likes: Array<string>;
}

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
    required: true
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }]
});

postSchema.statics.build = (attr: IPost) => {
  return new Post(attr);
};

const Post = mongoose.model<PostDoc, PostModelInterface>('Post', postSchema);

export { Post, IPost };
