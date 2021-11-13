import { User } from "../db/sequelize";

class UserService {
  constructor() {}

  /**
   * check if user exists in db by email
   * @returns user or error
   */
  async checkIfUserExistsByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
      where: {
        email,
      },
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
        id,
      },
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
        email,
      },
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
      password,
    } as any);

    await newUser.save();

    return newUser;
  }

  deleteUser() {}
}

export default new UserService();
