import { IAttributeResponse } from "../../models/dtos/attribute/attribute-models";
import { tableColumnTextFilterConfig } from "../../utils/table-antd-util";
import * as apiAttribute from "../../services/api/attribute-http";
import { Button, message, Popconfirm, Space, Table, Tooltip } from "antd";
import { useState, useEffect, memo } from "react";

import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { generalConst } from "../../utils/constants/general-const";
import {
  IAddOrUpdateDialogFlags,
  IAttributePage,
  initialModels,
} from "./page-models";
import AddOrUpdateAttributeDialog from "./add-update-dialog";
import { userHasPermission } from "../../utils/authenticate/role-operations-methods";
import { roleClaims } from "../../utils/authenticate/role-names";

const AttributeIndex = () => {
  //Dialog Modal
  const [addOrUpdateDialogFlags, setAddOrUpdateDialogFlags] =
    useState<IAddOrUpdateDialogFlags>(initialModels.addOrUpdateDialogFlags);

  const [attributes, setAttributes] = useState<IAttributeResponse[]>([]); //initial value

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    apiAttribute.getList().then((result) => {
      setAttributes(result.data.data);
    });
  };

  const deleteAttribute = (id: number) => {
    apiAttribute.deleteAttribute(id).then((response) => {
      message.success(generalConst.deleteRecord);
      getList();
    });
  };

  const onClose = (isUpdate: boolean) => {
    if (isUpdate) {
      getList();
    }
    setAddOrUpdateDialogFlags(initialModels.addOrUpdateDialogFlags);
  };

  const columns = [
    {
      key: "name",
      title: "NİTELİK",
      dataIndex: "name",
      render: (text: string) => text,
      ...tableColumnTextFilterConfig<IAttributePage>(),
      onFilter: (value: any, record: IAttributePage) => {
        return record.name
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
    {
      key: "description",
      title: "AÇIKLAMA",
      dataIndex: "description",
      render: (text: string) => text,
      ...tableColumnTextFilterConfig<IAttributePage>(),
      onFilter: (value: any, record: IAttributePage) => {
        return record.description
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
    {
      key: "operations",
      width: 120,
      render: (text: string, attribute: IAttributePage) => (
        <>
          <Tooltip placement="top" color="blue" title={"GÜNCELLE"}>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setAddOrUpdateDialogFlags({
                  ...addOrUpdateDialogFlags,
                  attributeModalVisible: true,
                  operationTitle: generalConst.update,
                  attributeId: attribute.id,
                });
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" color="red" title={"SİL"}>
            <Popconfirm
              title={generalConst.areYouSureToDelete}
              onConfirm={() => {
                deleteAttribute(attribute.id);
              }}
              okText={"EVET"}
              cancelText={"HAYIR"}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const header = (
    <Button
      type="primary"
      style={{ float: "right" }}
      icon={<PlusSquareOutlined />}
      size={"large"}
      onClick={() => {
        setAddOrUpdateDialogFlags({
          ...addOrUpdateDialogFlags,
          attributeModalVisible: true,
          operationTitle: generalConst.add,
        });
      }}
    >
      EKLE
    </Button>
  );

  return (
    <>
      <AddOrUpdateAttributeDialog
        flags={addOrUpdateDialogFlags}
        onClose={onClose}
      />
      {/* Tag */}
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        {userHasPermission(roleClaims.attribute_add) && header}
        <Table
          bordered
          size="small"
          columns={columns}
          dataSource={attributes}
        />
      </Space>
    </>
  );
};
export default AttributeIndex;
