import React, { ReactNode, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/dashboard", <DesktopOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const DefaultLayout: React.FC = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key) {
      navigate(key);
    }
  };
  const logout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="/d-rent-logo.png" width="150"></img>
        </div>

        <Menu
          theme="light"
          mode="inline"
          items={items}
          defaultSelectedKeys={["/dashboard"]}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={logout}>Logout</button>
          </div>
        </Header>
        <Content style={{ padding: "0 16px", background: colorBgContainer }}>
          {children}
        </Content>
        <Footer style={{ textAlign: "center", padding: "10px 20px" }}>
          D-RENT ©2023 | Developed by @subash @karthi @anandh
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
