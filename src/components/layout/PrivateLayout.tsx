import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ProjectOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import PrivateRoute from "../../app/routes/PrivateRoutes";
import AdminLayout from "./AdminLayout";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/dashboard",
    },
    { key: "2", icon: <TeamOutlined />, label: "Clients", path: "/clients" },
    {
      key: "3",
      icon: <ProjectOutlined />,
      label: "Projects",
      path: "/projects",
    },
    {
      key: "4",
      icon: <ProjectOutlined />,
      label: "Certifications",
      path: "/certifications",
    },
    {
      key: "5",
      icon: <SlidersOutlined />,
      label: "Sliders",
      path: "/sliders",
    },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuClick(item.path)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button
            type="primary"
            onClick={logout}
            style={{ float: "right", margin: "16px" }}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "0 16px" }}>{children || <Outlet />}</Content>
      </Layout>
    </Layout>
  );
  return (
    <PrivateRoute>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </PrivateRoute>
  );
};

export default PrivateLayout;
