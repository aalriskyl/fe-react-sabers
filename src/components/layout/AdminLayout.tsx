import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  ProjectOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Dropdown, Space } from "antd";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      label: "Clients",
      path: "/admin/clients",
    },
    {
      key: "3",
      icon: <ProjectOutlined />,
      label: "Projects",
      path: "/admin/projects",
    },
  ];

  const userMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: "Profile",
          onClick: () => console.log("Profile clicked"),
        },
        {
          key: "2",
          label: "Settings",
          onClick: () => console.log("Settings clicked"),
        },
        {
          type: "divider",
        },
        {
          key: "3",
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: logout,
        },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          background: colorBgContainer,
          boxShadow: "2px 0 8px 0 rgba(29, 35, 41, 0.05)",
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{ padding: 16, textAlign: "center" }}
        >
          {collapsed ? (
            <div style={{ fontSize: 20, fontWeight: "bold" }}>AD</div>
          ) : (
            <div style={{ fontSize: 20, fontWeight: "bold" }}>
              Admin Dashboard
            </div>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => navigate(item.path),
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 24,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Space style={{ cursor: "pointer", padding: "0 16px" }}>
              <Avatar src={user?.avatar} style={{ backgroundColor: "#1890ff" }}>
                {user?.name?.charAt(0)}
              </Avatar>
              {!collapsed && <span>{user?.name}</span>}
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 8,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
