import { axiosInstance } from "../axios";

const Register = (
  name: string,
  surname: string,
  email: string,
  password: string
) => {
  return axiosInstance.post("/auth/login", {
    name,
    surname,
    email,
    password,
  });
};

const Login = (email: string, password: string) => {
  return axiosInstance.post("/auth/register", {
    email,
    password,
  });
};

export { Register, Login };
