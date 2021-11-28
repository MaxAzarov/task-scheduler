import { useCallback, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../components/api/auth";
import "antd/dist/antd.css";
import "./Register.scss";
import useLocalStorage from "../../customHooks/useLocalStorage";
import MicrosoftButton from "../../components/common/Buttons/MicrosoftButton/MicrosoftButton";
import GoogleButton from "../../components/common/Buttons/GoogleButton/GoogleButton";

const Register = () => {
  const navigate = useNavigate();
  const [setValue] = useLocalStorage("token", "");
  const [error, setError] = useState("");
  const onFinish = useCallback(
    async (values: any) => {
      try {
        await AuthAPI.Register(
          values.firstName,
          values.secondName,
          values.email,
          values.password
        );

        navigate("/", { replace: true });
      } catch (e: any) {
        console.log("🚀 ~ file: Register.tsx ~ line 30 ~ e", e);
        console.log("Invalid credentials or User exists!");
        setError(e.message);
      }
    },
    [navigate]
  );

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
        <p>Register</p>
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
      </Form>
    </div>
  );
};

export default Register;
