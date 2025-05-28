import { Form, Input, Button, Card, Alert, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

const LoginView = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [form] = Form.useForm();

  const token = localStorage.getItem('token');
  if (token) {
    navigate('/dashboard');
    return null;
  }

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      // If login succeeds without throwing an error, navigate
      navigate("/dashboard");
    } catch {
      // Error is already handled in the AuthContext
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: "20px",
      }}
    >
      <Card
        title="Login"
        style={{
          width: 400,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Spin spinning={loading}>
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default LoginView;
