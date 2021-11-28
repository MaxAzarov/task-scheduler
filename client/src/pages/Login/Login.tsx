import { useCallback, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";
import useLocalStorage from "../../customHooks/useLocalStorage";
import { AuthAPI } from "../../components/api/auth";
import "antd/dist/antd.css";
import "./Login.scss";
import MicrosoftButton from "../../components/common/Buttons/MicrosoftButton/MicrosoftButton";
import GoogleButton from "../../components/common/Buttons/GoogleButton/GoogleButton";
import useAuth from "../../customHooks/useAuth";

const Login = () => {
  const navigate: NavigateFunction = useNavigate();
  const { auth } = useAuth();
  const [error, setError] = useState("");
  const [, setValue] = useLocalStorage("token", "");

  const onFinish = useCallback(
    async (values: any) => {
      try {
        const response = await AuthAPI.Login(values.email, values.password);
        const { token } = response;
        auth(token);
        navigate("/dashboard", { replace: true });
      } catch (e) {
        setError("Invalid credentials");
      }
    },
    [auth, navigate]
  );

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log("🚀 ~ file: Login.tsx ~ line 36 ~ useEffect ~ params", params);

    if (params.token) {
      setValue(params.token);
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, setValue]);

  return (
    <div className="login-page">
      <Form className="login-page__form" initialValues={{}} onFinish={onFinish}>
        <p>Login</p>
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

        {error && <Form.Item>{error}</Form.Item>}

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
            <MicrosoftButton />
            <GoogleButton />
          </div>
        </Form.Item>

        <Form.Item>
          <Link to="/register">
            <p>Register page</p>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
