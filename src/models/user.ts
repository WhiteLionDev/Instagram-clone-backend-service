import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  follows?: Array<string>;
  creationDate?: Date;
};

interface UserModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string | undefined;
  follows: Array<string>;
  followers: Array<Object>;
  creationDate: Date;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  follows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  creationDate: {
    type: Date,
    default: new Date(),
    required: true
  }
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema);

export { User, IUser };
