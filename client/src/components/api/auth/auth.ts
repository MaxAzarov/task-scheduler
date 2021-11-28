import { axiosInstance } from "../axios";

const Register = async (
  firstName: string,
  secondName: string,
  email: string,
  password: string
) => {
  const response = await axiosInstance.post("/auth/register", {
    firstName,
    secondName,
    email,
    password,
  });

  return response.data;
};

const Login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export { Register, Login };
