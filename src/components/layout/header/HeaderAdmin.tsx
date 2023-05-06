import { Header } from "antd/lib/layout/layout";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Avatar, Button, Dropdown, Space } from "antd";
import HeaderDropdown from "./avatar/HeaderDropdown";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderAdmin(props: Props) {
  const { collapsed, setCollapsed } = props;

  return (
    <Header
      style={{
        padding: "0px 10px",
        color: "white",
      }}
      className="layout-site-header"
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger header-switch-icon",
        onClick: () => setCollapsed(!collapsed ?? false),
      })}

      <div style={{ position: "relative", float: "right", height: "100%" }}>
        <div className="header_avatar_pozisiyon">
          <div style={{ flex: "0 0 50%" }}>
            {/* <Dropdown overlay={null} arrow>
                                <div className="langs">
                                    <div className="lang">
                                    </div>
                                </div>
                            </Dropdown> */}
          </div>
          <div style={{ flex: "1 1 50%" }}>
            <HeaderDropdown />
          </div>
        </div>
      </div>
    </Header>
  );
}
