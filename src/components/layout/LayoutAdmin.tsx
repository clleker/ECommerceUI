import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Footer } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { navigationConst } from "../../utils/constants/navigation-const";
import HeaderAdmin from "./header/HeaderAdmin";
import { menuList } from "./menu/Menu";

const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navigateToPage = (e: any) => {
    navigate(e.item.props.link);
  };

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          onSelect={navigateToPage}
          defaultSelectedKeys={["1"]}
          items={menuList}
        />
      </Sider>
      <Layout className="site-layout">
        <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          className="site-layout-background"
          style={{
            // margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
