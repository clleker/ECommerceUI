import { AttributeGroupPage } from "../attribute-group/page-models";
import { tableColumnTextFilterConfig } from "../../utils/table-antd-util";
import * as httpUser from "../../services/api/user/user-http";
import { Button, message, Popconfirm, Space, Table, Tooltip } from "antd";
import { useState, useEffect } from "react";

import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { generalConst } from "../../utils/constants/general-const";
import { IAddOrUpdateDialogFlags, initialModels } from "./page-models";
import AddOrUpdateUserDialog from "./add-update-dialog";
import { IUserApiResponse } from "../../models/dtos/user/user/user-api-models";
import { ObjStatus } from "../../models/enums/enums";

const UserIndex = () => {
  //Dialog Modal
  const [addOrUpdateDialogFlags, setAddOrUpdateDialogFlags] =
    useState<IAddOrUpdateDialogFlags>(initialModels.addOrUpdateDialogFlags);

  const [users, setUsers] = useState<IUserApiResponse[]>([]); //initial value

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    httpUser.getList().then((result: any) => {
      setUsers(result.data.data);
    });
  };

  const deleteAttributeGroup = (id: number) => {
    httpUser.deleteUser(id).then((response: any) => {
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
      title: "İsim",
      dataIndex: "firstName",
    },
    {
      title: "Soyisim",
      dataIndex: "lastName",
    },
    {
      title: "E-mail",
      dataIndex: "email",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Tel",
      dataIndex: "phone",
    },
    {
      title: "Durum",
      dataIndex: "status",
      render: (text: string, user: IUserApiResponse) =>
        ObjStatus[Number(!user?.status)],
    },
    {
      key: "operations",
      width: 120,
      render: (text: string, user: IUserApiResponse) => (
        <>
          <Tooltip placement="top" color="blue" title={"GÜNCELLE"}>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                // setAddOrUpdateDialogFlags({
                //   ...addOrUpdateDialogFlags,
                //   attributeGroupModalVisible: true,
                //   operationTitle: generalConst.update,
                //   attributeGroupId: attribute.id,
                // });
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" color="red" title={"SİL"}>
            <Popconfirm
              title={generalConst.areYouSureToDelete}
              onConfirm={() => {
                deleteAttributeGroup(user.id);
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
          open: true,
          operationTitle: generalConst.add,
        });
      }}
    >
      EKLE
    </Button>
  );

  return (
    <>
      <AddOrUpdateUserDialog
        params={addOrUpdateDialogFlags}
        onClose={onClose}
      />
      {/* Tag */}
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        {header}
        <Table bordered size="small" columns={columns} dataSource={users} />
      </Space>
    </>
  );
};

export default UserIndex;
