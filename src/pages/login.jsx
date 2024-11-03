import React, { useContext } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { loginAPI } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../component/context/auth.context';

const LoginPage = () => {
    const navigate = useNavigate();
    const {Auth, setAuth } = useContext(AuthContext);

    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await loginAPI(email, password);
        if (res && res.EC === 0) {
            localStorage.setItem("access_token", res.access_token);
            localStorage.setItem("user_id", res.user.user_id);
            notification.success({
                message: "Đăng nhập thành công",
                description: "success",
            });

            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.user?.email ?? "",
                    name: res?.user?.name ?? "",
                },
            });
            navigate("/");
        } else {
            notification.error({
                message: "Lỗi đăng nhập",
                description: res?.EM ?? "error",
            });
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div style={{ margin: 50 }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Đăng Nhập
                    </Button>
                    <Button type="default" style={{ marginLeft: '10px' }} onClick={handleRegister}>
                        Đăng Ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
