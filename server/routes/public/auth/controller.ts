import { User } from "../../../db/sequelize";
import UserService from "./../../../services/User";
import AuthService from "./../../../services/Auth";
import bcrypt from "bcryptjs";
import ApiError from "../../../error/apiError";

const Login = async (
  email: string,
  password?: string
): Promise<string | Error | undefined> => {
  try {
    const candidate = await UserService.findUserByEmail(email);

    if (candidate) {
      if (password) {
        const isValid: boolean = await bcrypt.compare(
          candidate.password,
          password
        );

        if (isValid) {
          return "ok";
        }
      } else {
        throw new Error("User does not exist!");
      }
      return "ok";
    } else {
      throw new Error("User does not exist!");
    }
  } catch (e) {
    throw new Error("Invalid credentials");
  }
};

const Register = async (
  email: string,
  name: string,
  secondName: string,
  password?: string
) => {
  const candidate = await UserService.findUserByEmail(email);

  if (candidate) {
    throw new Error("User already exists");
  }

  let encryptedPassword;
  if (password) {
    encryptedPassword = await bcrypt.hash(password, 10);
  }

  try {
    const user: User = await UserService.addNewUser(
      name,
      secondName,
      email,
      encryptedPassword
    );

    return { status: "ok" };
  } catch (e) {
    throw new Error("Error occured!");
  }
};

export { Login, Register };
