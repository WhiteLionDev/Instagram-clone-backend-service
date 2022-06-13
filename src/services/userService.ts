import { Service } from "./service";
import { User, IUser } from '../models/user';

class UserService extends Service {
  constructor() {
    super();
  }

  /**
   * Find a specific user
   * @param filter 
   * @returns User object
   */
  async findOne(filter: Object) {
    try {
      const user = await User.findOne(filter);
      
      return user;
    } catch(err: any) {
      throw new Error(`Error on userService - findOne - ${err.toString()}`);
    }
  }

  /**
   * Retrieve info from the user
   * @param filter 
   * @returns User object
   */
  async retrieveInfo(filter: Object) {
    try {
      const user = await User.findOne(filter).select('-password').populate('follows', '-_id name');

      if (!user)
        throw new Error("User does not exists");

      const followers = await User.find({ 'follows': user._id }).select('-_id name');

      return {...user.toObject(), followers};
    } catch(err: any) {
      throw new Error(`Error on userService - retrieveInfo - ${err.toString()}`);
    }
  }

  /**
   * Creates a new user
   * @param userData 
   * @returns User object
   */
  async signUp(userData: IUser) {
    try {
      const user = User.build(userData);
      await user.save();

      user.password = undefined;

      return user;
    } catch(err: any) {
      throw new Error(`Error on userService - signUp - ${err.toString()}`);
    }
  }

  /**
   * Follow or unfollow user
   * @param userId id from the user who follows
   * @param followId id from the user to follow
   * @returns Follows quantity
   */
  async updateFollows(userId: string, followId: string) {
    try {
      const user = await User.findOne({ _id: userId });

      if (!user)
        throw new Error("User does not exists");

      const existingFollowerIndex = user.follows.findIndex((id) => id.toString() === followId);

      if (existingFollowerIndex >= 0) {
        user.follows.splice(existingFollowerIndex, 1);
      }
      else {
        user.follows.push(followId);
      }

      await user.save();

      return user.follows.length;
    } catch(err: any) {
      throw new Error(`Error on userService - updateFollows - ${err.toString()}`);
    }
  }

}

export { UserService };
