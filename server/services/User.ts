import bcrypt from "bcryptjs";
import AuthService from "./Auth";
import { User } from "../db/sequelize";

class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * check if user exists in db by email
   * @returns user or error
   */
  async checkIfUserExistsByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
      where: {
        email
      }
    });

    return user;
  }

  /**
   * check if user exists in db by id
   * @returns user or error
   */
  async checkIfUserExistsById(id: string): Promise<User> {
    const user = await User.findOne({
      where: {
        id
      }
    });

    if (user) {
      return user;
    } else {
      throw new Error("User not exists!");
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user: User | null = await User.findOne({
      where: {
        email
      }
    });

    return user;
  }

  async addNewUser(
    name: string,
    secondName: string,
    email: string,
    password?: string
  ): Promise<User> {
    const newUser = new User({
      name,
      secondName,
      email,
      password
    } as any);

    await newUser.save();

    return newUser;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deleteUser() {}

  Login = async (
    email: string,
    password?: string
  ): Promise<string | Error | undefined> => {
    try {
      const candidate = await this.findUserByEmail(email);

      if (candidate) {
        if (password) {
          const isValid: boolean = await bcrypt.compare(
            candidate.password,
            password
          );

          if (isValid) {
            const token = AuthService.issueToken(email, candidate.id);
            return token;
          }
        } else {
          throw new Error("User does not exist!");
        }
        const token = AuthService.issueToken(email, candidate.id);
        return token;
      } else {
        throw new Error("User does not exist!");
      }
    } catch (e) {
      throw new Error("Invalid credentials");
    }
  };

  Register = async (
    email: string,
    name: string,
    secondName: string,
    password?: string
  ) => {
    const candidate = await this.findUserByEmail(email);

    if (candidate) {
      throw new Error("User already exists");
    }

    let encryptedPassword;
    if (password) {
      encryptedPassword = await bcrypt.hash(password, 10);
    }

    try {
      await this.addNewUser(name, secondName, email, encryptedPassword);

      return { status: "ok" };
    } catch (e) {
      throw new Error("Error occured!");
    }
  };
}

export default new UserService();
