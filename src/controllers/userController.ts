import { Request, Response } from 'express';
import { Controller } from './controller';
import { UserService } from '../services/userService';
import { encrypt, compare } from '../utils/bcrypt';
import { generateToken } from '../utils/jwtToken';

class UserController extends Controller {
  constructor() {
    super();
  }

  /**
   * Retrieve information from the user
   * @param req 
   * @param res 
   */
  async retrieveInfo(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const userService = new UserService();
      const user = await userService.retrieveInfo({ _id: userId });

      if (!user)
        throw new Error("User does not exists");

      this.apiResponse.ok(res, { user });

    } catch (err: any) {
      this.apiResponse.internalServerError(res, err.toString());
    }
  };

  /**
   * Add a new user to the db
   * @param req 
   * @param res 
   */
  async signUp(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const validEmail = email.trim().toLowerCase();

      const userService = new UserService();
      const existingUser = await userService.findOne({ email: validEmail });

      if (existingUser)
        return this.apiResponse.badRequest(res, "User already exists");

      const userData = {
        name,
        email: validEmail,
        password: await encrypt(password)
      };

      const user = await userService.signUp(userData);

      this.apiResponse.ok(res, { user });

    } catch (err: any) {
      this.apiResponse.internalServerError(res, err.toString());
    }
  };

  /**
   * Identify a user by email and password and creates a jwt Token
   * @param req 
   * @param res 
   */
  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.query;

      const validEmail = (email as string).trim().toLowerCase();

      const userService = new UserService();

      const user = await userService.findOne({ email: validEmail });

      if (!user)
        return this.apiResponse.unauthorized(res, "Invalid credentials");

      const passwordsMatch = await compare(password as string, user.password as string);

      if (!passwordsMatch) {
        return this.apiResponse.unauthorized(res, "Invalid credentials");
      }

      const token = generateToken({ userId: user._id }); 

      this.apiResponse.ok(res, { token });

    } catch (err: any) {
      this.apiResponse.internalServerError(res, err.toString());
    }
  };

  /**
   * Follow or unfollow another user
   * @param req 
   * @param res 
   */
  async updateFollows(req: Request, res: Response) {
    try {
      const { userId, followId } = req.body;

      if (userId === followId)
        throw new Error("User can not follows him self");

      const userService = new UserService();

      const followsCount = await userService.updateFollows(userId, followId);

      this.apiResponse.ok(res, { follows: followsCount });

    } catch (err: any) {
      this.apiResponse.internalServerError(res, err.toString());
    }
  };
}

export { UserController };