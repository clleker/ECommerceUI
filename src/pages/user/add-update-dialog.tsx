import { Checkbox, Form, Input, message, Modal, Select } from "antd";
import { memo, useEffect, useState } from "react";
import { generalConst } from "../../utils/constants/general-const";
import * as httpUser from "../../services/api/user/user-http";
import * as httpAuthGroup from "../../services/api/user/auth-group-http";
import { IAddOrUpdateDialogFlags } from "./page-models";
import { getList } from "../../services/api/attribute-group-http";
import { IAuthGroupApiResponse } from "../../models/dtos/user/auth-group/auth-group-api-models";
import { map } from "../../models/dtos/user/auth-group/auth-mapping";
import {
  mapForAddingUser,
  mapForUpdatingUser,
} from "../../models/dtos/user/user/user-mapping";

export interface IAddOrUpdateProps {
  params: IAddOrUpdateDialogFlags;
  onClose: (isUpdated: boolean) => void;
}

function AddOrUpdateUserDialog(props: IAddOrUpdateProps) {
  const { params, onClose } = props;
  const [userForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  const [authGroups, setAuthGroups] = useState<IAuthGroupApiResponse[]>([]);

  useEffect(() => {
    if (!params.open) {
      userForm.resetFields();
    }
    if (params.userId !== 0) {
      getById();
    }
  }, [params]);

  useEffect(() => {
    httpAuthGroup.getList().then((response) => {
      debugger;
      setAuthGroups(response.data.data);
    });
  }, []);

  // const fillTagForm = (attribute: IAttributePage) => {
  //   authGroupForm.setFieldsValue(attribute);
  // };

  const getById = () => {
    // apiAttribute.getById(flags.attributeId).then((result) => {
    //   fillTagForm(result.data);
    // });
  };

  const addOrUpdate = (user: any) => {
    debugger;
    if (user.id === 0) httpUser.add(mapForAddingUser(user)).then(httpResult);
    else httpUser.update(mapForUpdatingUser(user)).then(httpResult);
  };

  const httpResult = (response: any) => {
    message.success(generalConst.operationSuccess);
    onClose(true);
    getList();
  };

  return (
    <Modal
      forceRender
      title={"Kullanıcı"}
      open={params.open}
      onCancel={() => {
        onClose(false);
      }}
      onOk={() => {
        userForm.submit();
      }}
      okText={params.operationTitle}
      cancelText={generalConst.cancel}
      // confirmLoading={loading}1
    >
      <Form
        form={userForm}
        layout={"horizontal"}
        onFinish={addOrUpdate}
        {...formItemLayout}
        size={"small"}
        labelAlign={"left"}
      >
        <Form.Item name={"id"} hidden={true} initialValue={0}>
          <Input />
        </Form.Item>
        <Form.Item
          label={"İsim"}
          name="firstName"
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"İsim"} />
        </Form.Item>
        <Form.Item
          label={"Soyisim"}
          name="lastName"
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Soyisim"} />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name="email"
          rules={[
            {
              type: "email",
              message: generalConst.notValidEmail,
            },
            {
              required: true,
              message: generalConst.required_field,
            },
          ]}
        >
          <Input type="" placeholder={"Email"} />
        </Form.Item>
        <Form.Item label={"Title"} name="title">
          <Input placeholder={"Title"} />
        </Form.Item>
        <Form.Item label={"Tel"} name="phone">
          <Input placeholder={"Tel"} />
        </Form.Item>
        <Form.Item
          label={"Şifre"}
          name="password"
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Şifre"} />
        </Form.Item>
        {params.userId !== 0 && (
          <Form.Item
            label={"Durum"}
            name="status"
            valuePropName="checked"
            // wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Durum</Checkbox>
          </Form.Item>
        )}
        <Form.Item
          label={"Yetki Grubu"}
          name={"authGroupIds"}
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Select
            mode={"multiple"}
            showSearch
            placeholder="Seçiniz"
            optionFilterProp="children"
            options={authGroups.map((x) => ({
              value: x.authGroupId,
              label: x.name,
              key: x.authGroupId,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default memo(
  AddOrUpdateUserDialog,
  (prev: IAddOrUpdateProps, next: IAddOrUpdateProps) => {
    return prev.params === next.params;
  }
);
