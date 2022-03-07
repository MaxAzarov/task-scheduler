import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const { JWT_SECRET = "secret" } = process.env;

class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  issueToken(email: string, id: number): string {
    const token = jwt.sign(
      {
        email: email,
        id: id
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }

  verifyToken(token: string): string | jwt.JwtPayload {
    const verified: string | jwt.JwtPayload = jwt.verify(token, JWT_SECRET);

    return verified;
  }
}

export default new AuthService();
