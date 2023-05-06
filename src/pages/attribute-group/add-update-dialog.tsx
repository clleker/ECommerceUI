import { Form, Input, message, Modal } from "antd";
import { useEffect } from "react";
import { generalConst } from "../../utils/constants/general-const";
import * as apiAttributeGroup from "../../services/api/attribute-group-http";
import { AttributeGroupPage, IAddOrUpdateDialogFlags } from "./page-models";
import { AxiosResponse } from "axios";
import {
  addAttributeGroupMappingForApi,
  updateAttributeGroupMappingForApi,
} from "../../models/dtos/attribute-group/attribute-group-mapping";
import { getList } from "../../services/api/attribute-group-http";

export interface IAddOrUpdateProps {
  flags: IAddOrUpdateDialogFlags;
  onClose: (isUpdated: boolean) => void;
}

export default function AddOrUpdateAttributeDialog(props: IAddOrUpdateProps) {
  const { flags, onClose } = props;
  const [attributeGroupForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  useEffect(() => {
    if (flags.attributeGroupId !== 0) {
      getById();
    }
    if (!flags.attributeGroupModalVisible) {
      attributeGroupForm.resetFields();
    }
  }, [flags]);

  const fillTagForm = (attributeGroup: AttributeGroupPage) => {
    attributeGroupForm.setFieldsValue(attributeGroup);
  };

  const getById = () => {
    apiAttributeGroup.getById(flags.attributeGroupId).then((result: any) => {
      fillTagForm(result.data.data);
    });
  };

  const addOrUpdate = (attributeGroup: AttributeGroupPage) => {
    if (attributeGroup.id === 0)
      apiAttributeGroup
        .add(addAttributeGroupMappingForApi(attributeGroup))
        .then(apiResult);
    else
      apiAttributeGroup
        .update(updateAttributeGroupMappingForApi(attributeGroup))
        .then(apiResult);
  };

  const apiResult = (response: AxiosResponse<any, any>) => {
    if (response.status === 200) {
      message.success(generalConst.operationSuccess);
      onClose(true);
      getList();
    }
  };

  return (
    <Modal
      forceRender
      title={"Nitelik Grubu"}
      open={flags.attributeGroupModalVisible}
      onCancel={() => {
        onClose(false);
        attributeGroupForm.resetFields();
      }}
      onOk={() => {
        attributeGroupForm.submit();
      }}
      okText={flags.operationTitle}
      cancelText={generalConst.cancel}
      // confirmLoading={loading}
    >
      <Form
        form={attributeGroupForm}
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
          label={"Nitelik Grubu Adı"}
          name="title"
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Nitelik Grubu Adı"} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
