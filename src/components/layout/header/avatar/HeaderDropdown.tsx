import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { logoutSuccess } from "../../../../redux/actions/authAction";
function HeaderDropdown(props: any) {
  const { dispatchLogout } = props;
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" onClick={() => dispatchLogout()}>
          Çıkış Yap
        </a>
      ),
    },
  ];
  return (
    <Space direction="vertical">
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Space>
          <Avatar size={30} icon={<UserOutlined />}></Avatar>
          Celal Eker
        </Space>
      </Dropdown>
    </Space>
  );
}

const mapDispatchToProps = {
  dispatchLogout: logoutSuccess,
};

export default connect(null, mapDispatchToProps)(HeaderDropdown);
