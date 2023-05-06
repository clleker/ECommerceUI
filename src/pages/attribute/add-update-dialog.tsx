import { Form, Input, message, Modal } from "antd";
import { memo, useEffect } from "react";
import { generalConst } from "../../utils/constants/general-const";
import * as apiAttribute from "../../services/api/attribute-http";
import { IAddOrUpdateDialogFlags, IAttributePage } from "./page-models";
import { getList } from "../../services/api/attribute-group-http";

export interface IAddOrUpdateProps {
  flags: IAddOrUpdateDialogFlags;
  onClose: (isUpdated: boolean) => void;
}

function AddOrUpdateAttributeDialog(props: IAddOrUpdateProps) {
  const { flags, onClose } = props;
  const [attributeForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  useEffect(() => {
    if (!flags.attributeModalVisible) {
      attributeForm.resetFields();
    }
    if (flags.attributeId !== 0) {
      getById();
    }
  }, [flags]);

  const fillTagForm = (attribute: IAttributePage) => {
    attributeForm.setFieldsValue(attribute);
  };

  const getById = () => {
    apiAttribute.getById(flags.attributeId).then((result) => {
      fillTagForm(result.data.data);
    });
  };

  const addOrUpdate = (attribute: IAttributePage) => {
    if (attribute.id === 0) apiAttribute.add(attribute).then(apiResult);
    else apiAttribute.update(attribute).then(apiResult);
  };

  const apiResult = (response: any) => {
    if (response.status === 200) {
      message.success(generalConst.operationSuccess);
      onClose(true);
      getList();
    } else {
      message.error(response.statusText);
    }
  };

  return (
    <Modal
      forceRender
      title={"Nitelikler"}
      open={flags.attributeModalVisible}
      onCancel={() => {
        onClose(false);
      }}
      onOk={() => {
        attributeForm.submit();
      }}
      okText={flags.operationTitle}
      cancelText={generalConst.cancel}
      // confirmLoading={loading}
    >
      <Form
        form={attributeForm}
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
          label={"Nitelik Adı"}
          name="name"
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Nitelik Adı"} />
        </Form.Item>
        <Form.Item label={"Açıklama"} name="description">
          <Input placeholder={"Açıklama"} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default memo(
  AddOrUpdateAttributeDialog,
  (prev: IAddOrUpdateProps, next: IAddOrUpdateProps) => {
    return prev.flags === next.flags;
  }
);
