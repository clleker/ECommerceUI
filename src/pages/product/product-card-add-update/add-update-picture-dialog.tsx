import { Button, Form, message, Modal, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { generalConst } from "../../../utils/constants/general-const";
import { UploadOutlined } from "@ant-design/icons";
import { IAddOrUpdatePictureDialog, IPicturePage } from "../page-models";
import * as apiProductCardPicture from "../../../services/api/product-card-picture-http";
import { addPictureToProductCardForApiMapping } from "../../../models/dtos/product-card/product-card-mapping";

export interface IAddOrUpdateProps {
  dialog: IAddOrUpdatePictureDialog;
  onClose: (isUpdated: boolean) => void;
}
export default function AddOrUpdatePictureDialog(props: IAddOrUpdateProps) {
  const { dialog, onClose } = props;
  const [pictureForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };
  const [pictureList, setPictureList] = useState<any[]>([]);

  useEffect(() => {
    if (dialog.productCardId !== 0 && dialog.open) {
      pictureForm.setFieldValue("productCardId", dialog.productCardId);
      getPictureListByProductCardId();
    }
  }, [dialog]);

  const getPictureListByProductCardId = () => {
    apiProductCardPicture
      .getListByProductCardId(dialog.productCardId)
      .then((result) => {
        setPictureList(result.data);
      });
  };

  const addOrUpdatePicture = (pictures: IPicturePage) => {
    const mappedPicture = addPictureToProductCardForApiMapping(pictures);
    apiProductCardPicture
      .addPicturesToProduct(mappedPicture)
      .then((response) => {});
  };

  const getFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleUploadBeforeBanner = (file: any) => {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    return false;
  };

  return (
    <>
      <div className="separate-20"></div>
      <Modal
        title={"Resimler"}
        open={dialog.open}
        onCancel={() => {
          onClose(false);
        }}
        onOk={() => {
          pictureForm.submit();
          //   setPictureVariables(initialModels.pictureVariables);
        }}
        okText={"Kaydet"}
        cancelText={generalConst.cancel}
        // confirmLoading={loading}
      >
        <>
          {" "}
          {pictureList.map((x) => {
            <img src={x.filePath} />;
          })}
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Form
              form={pictureForm}
              layout={"horizontal"}
              onFinish={addOrUpdatePicture}
              {...formItemLayout}
              size={"small"}
              labelAlign={"left"}
            >
              <Form.Item name={"productCardId"} hidden={true}>
                {" "}
              </Form.Item>

              <Form.Item
                name="pictures"
                valuePropName="fileList"
                getValueFromEvent={getFile}
                rules={[
                  { required: true, message: generalConst.required_field },
                ]}
              >
                <Upload
                  type="select"
                  showUploadList={{ showRemoveIcon: true }}
                  accept=".jpg"
                  listType="picture"
                  maxCount={4}
                  multiple={true}
                  beforeUpload={handleUploadBeforeBanner}
                >
                  <Button icon={<UploadOutlined />}>Ürün Resimleri</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Space>
        </>
      </Modal>
    </>
  );
}
