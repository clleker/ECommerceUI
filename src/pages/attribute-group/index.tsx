import { AttributeGroupPage } from "../attribute-group/page-models";
import { tableColumnTextFilterConfig } from "../../utils/table-antd-util";
import * as apiAttributeGroup from "../../services/api/attribute-group-http";
import { Button, message, Popconfirm, Space, Table, Tooltip } from "antd";
import { useState, useEffect } from "react";

import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { generalConst } from "../../utils/constants/general-const";
import { IAddOrUpdateDialogFlags, initialModels } from "./page-models";
import AddOrUpdateAttributeDialog from "./add-update-dialog";
import { mappingForPage } from "../../models/dtos/attribute-group/attribute-group-mapping";
import { IAttributeGroupResponse } from "../../models/dtos/attribute-group/attribute-group-api-models";

const AttributeGroupIndex = () => {
  //Dialog Modal
  const [addOrUpdateDialogFlags, setAddOrUpdateDialogFlags] =
    useState<IAddOrUpdateDialogFlags>(initialModels.addOrUpdateDialogFlags);

  const [attributeGroups, setAttributeGroups] = useState<AttributeGroupPage[]>(
    []
  ); //initial value

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    apiAttributeGroup.getList().then((result: any) => {
      setAttributeGroups(
        mappingForPage(result.data.data as IAttributeGroupResponse[])
      );
    });
  };

  const deleteAttributeGroup = (id: number) => {
    apiAttributeGroup.deleteAttribute(id).then((response: any) => {
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
      title: "NİTELİK GRUBU",
      dataIndex: "title",
      render: (text: string) => text,
      ...tableColumnTextFilterConfig<AttributeGroupPage>(),
      onFilter: (value: any, record: AttributeGroupPage) => {
        return record.title
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
    {
      key: "operations",
      width: 120,
      render: (text: string, attribute: AttributeGroupPage) => (
        <>
          <Tooltip placement="top" color="blue" title={"GÜNCELLE"}>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setAddOrUpdateDialogFlags({
                  ...addOrUpdateDialogFlags,
                  attributeGroupModalVisible: true,
                  operationTitle: generalConst.update,
                  attributeGroupId: attribute.id,
                });
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" color="red" title={"SİL"}>
            <Popconfirm
              title={generalConst.areYouSureToDelete}
              onConfirm={() => {
                deleteAttributeGroup(attribute.id);
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
          attributeGroupModalVisible: true,
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
        {header}
        <Table
          bordered
          size="small"
          columns={columns}
          dataSource={attributeGroups}
        />
      </Space>
    </>
  );
};

export default AttributeGroupIndex;
