import { User } from "../../../db/sequelize";
import UserService from "./../../../services/User";
import AuthService from "./../../../services/Auth";
import bcrypt from "bcryptjs";

const Login = async (
  email: string,
  password?: string
): Promise<string | Error | undefined> => {
  try {
    const candidate = await UserService.findUserByEmail(email);

    if (candidate) {
      if (password) {
        const isValid: boolean = await bcrypt.compare(
          password,
          candidate.password
        );

        if (isValid) {
          return "ok";
        }
      } else {
        return new Error("User does not exist!");
      }
      return "ok";
    } else {
      return new Error("User does not exist!");
    }
  } catch (e) {
    return new Error("Invalid credentials");
  }
};

const Register = async (
  email: string,
  name: string,
  secondName: string,
  password?: string
): Promise<string | Error> => {
  const candidate = await UserService.findUserByEmail(email);

  if (candidate) {
    return new Error("User already exists");
  }

  let encryptedPassword;
  if (password) {
    encryptedPassword = await bcrypt.hash(password, 10);
  }

  const user: User = await UserService.addNewUser(
    name,
    secondName,
    email,
    encryptedPassword
  );

  return AuthService.issueToken(user.email, user.id);
};

export { Login, Register };
