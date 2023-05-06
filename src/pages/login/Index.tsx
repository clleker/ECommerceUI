import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import { ILoginPage } from "./page-models";
import * as apiAuth from "../../services/api/user/auth-http";
import { loginSuccess } from "../../redux/actions/authAction";

import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { tokenHandler } from "../../utils/local-storage/local-storage-utils";

function LoginIndex(props: any) {
  const { loginSuccess } = props;
  const navigate = useNavigate();

  const loginSubmit = (user_form: ILoginPage) => {
    apiAuth.login(user_form).then((res) => {
      loginSuccess(res.data.token); //send to redux
      tokenHandler(res.data.token);
      navigate("/");
    });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col>
        <Form
          style={{ width: "50rem" }}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={loginSubmit}
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email Giriniz!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Şifrenizi giriniz!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Beni hatırla</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Giriş
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

const mapDispatchToProps = { loginSuccess };

export default connect(null, mapDispatchToProps)(LoginIndex);
