import { Button, Form, Input, message, Modal, Upload } from "antd";
import { useEffect } from "react";
import { generalConst } from "../../utils/constants/general-const";
import * as apiCategory from "../../services/api/category-http";
import { IAddOrUpdateCategoryDialogFlags, ICategoryPage } from "./page-models";
import { UploadOutlined } from "@ant-design/icons";
import { AxiosResponse } from "axios";
import {
  addCategoryMappingForApi,
  updateCategoryMappingForApi,
} from "../../models/dtos/category/category-mapping";
import CategoryDropdown from "../../components/shared/CategoryDropdown";

export interface IAddOrUpdateProps {
  flags: IAddOrUpdateCategoryDialogFlags;
  onClose: (isUpdated: boolean) => void;
}

export default function AddOrUpdateCategoryDialog(props: IAddOrUpdateProps) {
  const { flags, onClose } = props;
  const [categoryForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  useEffect(() => {
    if (flags.categoryId !== 0) {
      getById();
    }
    if (!flags.categoryModalVisible) {
      categoryForm.resetFields();
    }
  }, [flags]);

  const fillTagForm = (category: ICategoryPage) => {
    categoryForm.setFieldsValue(category);
  };

  const getById = () => {
    apiCategory.getById(flags.categoryId).then((result) => {
      fillTagForm(result.data);
    });
  };

  const addOrUpdate = (category: ICategoryPage) => {
    if (category.id === 0)
      apiCategory.add(addCategoryMappingForApi(category)).then(apiResult);
    else
      apiCategory.update(updateCategoryMappingForApi(category)).then(apiResult);
  };

  const apiResult = (response: AxiosResponse<any, any>) => {
    if (response.status === 200) {
      message.success(generalConst.operationSuccess);
      onClose(true);
    }
  };
  //#region   UploadFile
  const getFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  //it allows only the png.
  const handleUploadBeforeBanner = (file: any) => {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    return false;
  };
  //#endregion
  return (
    <Modal
      forceRender
      title={"Nitelik Grubu"}
      open={flags.categoryModalVisible}
      onCancel={() => {
        onClose(false);
        categoryForm.resetFields();
      }}
      onOk={() => {
        categoryForm.submit();
      }}
      okText={flags.operationTitle}
      cancelText={generalConst.cancel}
      // confirmLoading={loading}
    >
      <Form
        form={categoryForm}
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
          label={"Kategori İsmi"}
          name="name"
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Kategori İsmi"} />
        </Form.Item>
        <Form.Item
          label={"Açıklama"}
          name="description"
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Kategori İsmi"} />
        </Form.Item>
        <Form.Item
          label={"Meta Keywords"}
          name="metaKeywords"
          // rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Meta Keywords"} />
        </Form.Item>
        <Form.Item
          label={"MetaDescription"}
          name="metaDescription"
          // rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Meta Description"} />
        </Form.Item>
        <Form.Item
          label={"Meta Title"}
          name="metaTitle"
          // rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Meta Title"} />
        </Form.Item>
        <CategoryDropdown
          name={"parentCategoryId"}
          label={"Üst Kategori"}
          rules={[{ required: true, message: generalConst.required_field }]}
        />
        <Form.Item
          label="Icon-Image"
          name="iconImage"
          valuePropName="fileList"
          getValueFromEvent={getFile}
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Upload
            type="select"
            showUploadList={{ showRemoveIcon: false }}
            beforeUpload={handleUploadBeforeBanner}
            accept=".jpg"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Icon</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
