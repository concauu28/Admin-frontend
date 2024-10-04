import React, { useContext, useState, useEffect } from 'react';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, notification } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [current, setCurrent] = useState('homepage');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const menuItems = [
            {
                label: <Link to={`/`}>Trang Chủ</Link>,
                key: 'homepage',
                icon: <MailOutlined />,
            },
            ...(auth.isAuthenticated ? [
                {
                    label: <Link to={`/addrequest`}>Bán hàng </Link>,
                    key: 'addrequest',
                    icon: <MailOutlined />,
                },
                {
                    label: <Link to={`/request`}>Công việc</Link>,
                    key: 'requests',
                    icon: <MailOutlined />,
                },
                {
                    label: <Link to={`/addservice`}>Thêm dịch vụ</Link>,
                    key: 'addservice',
                    icon: <MailOutlined />,
                },
                {
                    label: <Link to={`/report`}>Báo cáo</Link>,
                    key: 'report',
                    icon: <MailOutlined />,
                },
                {
                    label: 'Khach Hang',
                    key: 'customercontainer',
                    icon: <MailOutlined />,
                    children: [
                        {
                            label: <Link to={`/user`}>Danh sách khách hàng</Link>,
                            key: 'user',
                            icon: <MailOutlined />,
                        },
                        {
                            label: <Link to={`/addcustomer`}>Thêm Khách Hàng</Link>,
                            key: 'addcustomer',
                            icon: <MailOutlined />,
                        },
                    ]

                },
                {
                    label: 'Nha cung cap',
                    key: 'providercontainer',
                    icon: <MailOutlined />,
                    children: [
                        {
                            label: <Link to={`/listofprovider`}>Danh sách nhà cung cấp</Link>,
                            key: 'provider',
                        },
                        {
                            label: <Link to={`/registerprovider`}>Thêm nhà cung cấp</Link>,
                            key: 'addprovider',
                        },
                        {
                            label: <Link to={`/addproviderservice`}>Thêm dịch vụ nhà cung cấp</Link>,
                            key: 'addproviderservice',
                        }
                    ]

                }
            ] : []),
            {
                label: `Welcome`,
                key: 'SubMenu',
                icon: <SettingOutlined />,
                children: auth.isAuthenticated ? [
                    {
                        label: <span onClick={() => handleLogout()}>Đăng Xuất</span>,
                        key: 'logout',
                    }
                ] : [
                    {
                        label: <Link to={`/login`}>Đăng Nhập</Link>,
                        key: 'login',
                    },
                    {
                        label: <Link to={`/register`}>Đăng Ký</Link>,
                        key: 'register',
                    }
                ],
            }
        ];

        setItems(menuItems);
    }, [auth.isAuthenticated]);

    const handleLogout = () => {
        setAuth({
            isAuthenticated: false,
            user: {
                email: "",
                name: ""
            }
        });
        localStorage.clear("access_token");
        notification.success({
            message: "Đăng xuất thành công",
            description: "success"
        });
        setCurrent("homepage");
        navigate("/");
    };

    const onClick = (e) => {
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
