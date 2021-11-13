import { useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { auth } from "./../../api/auth";
import "./Login.scss";
import useLocalStorage from "../../../customHooks/useLocalStorage";

const Login = () => {
  const navigate = useNavigate();
  const [_, setValue] = useLocalStorage("token", "");
  const onFinish = async (values: any) => {
    try {
      const token = await auth.Register(
        values.firstName,
        values.secondName,
        values.email,
        values.password
      );
      setValue(`Bearer ${token}`);
      navigate("dashboard");
    } catch (e) {
      console.log("invalid credentials");
    }
  };

  useEffect(() => {
    const urlSearchParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );
    const params: {
      [k: string]: string;
    } = Object.fromEntries(urlSearchParams.entries());
    if (params.token) {
      setValue(`Bearer ${params.token}`);
      navigate("dashboard");
    }
  }, [navigate, setValue]);

  return (
    <div className="login-page">
      <Form className="login-page__form" initialValues={{}} onFinish={onFinish}>
        <p>Login</p>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First name"
          />
        </Form.Item>
        <Form.Item
          name="secondName"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Second name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>

        <p>or use</p>

        <Form.Item>
          <div className="login-page__buttons">
            <Button className="microsoft-btn">
              <iframe
                frameBorder="no"
                title="Inline Frame Example"
                src="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
                className="microsoft-icon"
              />
              Continue with Microsoft
            </Button>

            <Button className="google-btn">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google"
              />
              Continue with Google
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
