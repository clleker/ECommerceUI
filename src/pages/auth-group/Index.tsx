import { tableColumnTextFilterConfig } from "../../utils/table-antd-util";
import * as httpAuthGroup from "../../services/api/user/auth-group-http";
import * as httpRole from "../../services/api/user/role-http";

import { Button, Card, Col, Input, List, Row, Space, Tag, Tooltip } from "antd";
import { useState, useEffect } from "react";

import { PlusSquareOutlined, EditOutlined } from "@ant-design/icons";
import { generalConst } from "../../utils/constants/general-const";
import { IAddOrUpdateDialogFlags, initialModels } from "./page-models";
import AddOrUpdateAuthGroupDialog from "./add-update-dialog";
import { userHasPermission } from "../../utils/authenticate/role-operations-methods";
import { roleClaims } from "../../utils/authenticate/role-names";
import { IAuthGroupApiResponse } from "../../models/dtos/user/auth-group/auth-group-api-models";
import VirtualList from "rc-virtual-list";
import { GetRoleByAuthGroupIdApiResponse } from "../../models/dtos/user/role/role-api-models";
import HttpStatusCode from "../../utils/helpers/http-status-codes";

const AuthGroupIndex = () => {
  //Dialog Modal
  const [addOrUpdateDialogParams, setAddOrUpdateDialogParams] =
    useState<IAddOrUpdateDialogFlags>(initialModels.addOrUpdateDialogFlags);

  const [authGroups, setAuthGroups] = useState<IAuthGroupApiResponse[]>([]);
  const [authGroupFilter, setAuthGroupFilter] = useState<
    IAuthGroupApiResponse[]
  >([]);

  const [roles, setRoles] = useState<GetRoleByAuthGroupIdApiResponse[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number>(
    roles[0]?.id ?? 0
  );
  const containerHeight = 400;

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    httpAuthGroup.getList().then((result) => {
      setAuthGroups(result.data.data);
      setAuthGroupFilter(result.data.data);
    });
  };

  const getRoleListByAuthGroupId = async (
    authGroupId: number,
    callback: () => void
  ) => {
    await httpRole.getRolesByAuthGroupId(authGroupId).then((result) => {
      if (result.status == HttpStatusCode.OK) {
        setRoles(result.data.data);
        callback();
      }
    });
  };

  const onClose = (isUpdate: boolean) => {
    if (isUpdate) {
      getList();
    }
    setAddOrUpdateDialogParams(initialModels.addOrUpdateDialogFlags);
  };

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      containerHeight
    ) {
      getList();
    }
  };
  const headerHtml = (
    <Button
      type="primary"
      style={{ float: "right" }}
      icon={<PlusSquareOutlined />}
      size={"large"}
      onClick={() => {
        setAddOrUpdateDialogParams((prev) => ({
          ...prev,
          open: true,
          operationTitle: generalConst.add,
        }));
      }}
    >
      EKLE
    </Button>
  );
  const searchAuthList = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0 && e.target.value.trim().length == 0) return;
    const result = authGroups.filter((x) =>
      x.name.toLowerCase().includes(e.target?.value?.toLowerCase().trim())
    );
    setAuthGroupFilter(result);
  };

  const authListHeaderHtml = (
    <Space size={"large"}>
      <h2>Yetki Grubu</h2>
      <Input
        placeholder="Ara"
        size="large"
        onChange={(e) => searchAuthList(e)}
      />
    </Space>
  );

  return (
    <>
      <AddOrUpdateAuthGroupDialog
        params={addOrUpdateDialogParams}
        onClose={onClose}
      />
      {/* Tag */}

      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        {headerHtml}
        <Row>
          <Col span={8}>
            <List size="small" bordered header={authListHeaderHtml}>
              <VirtualList
                data={authGroupFilter}
                height={containerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
              >
                {(item: IAuthGroupApiResponse) => (
                  <List.Item
                    key={item.authGroupId}
                    onClick={() =>
                      getRoleListByAuthGroupId(item.authGroupId, () =>
                        setSelectedRoleId(item.authGroupId)
                      )
                    }
                    className={(
                      selectedRoleId == item.authGroupId &&
                      "antdlist-selected-item"
                    ).toString()}
                  >
                    <td>
                      <div>{item.name}</div>
                    </td>
                    <td>
                      <Tooltip placement="top" color="blue" title={"GÜNCELLE"}>
                        <Button
                          style={{ float: "right" }}
                          icon={<EditOutlined />}
                          onClick={() => {
                            // setAddOrUpdateDialogFlags({
                            //   ...addOrUpdateDialogFlags,
                            //   attributeModalVisible: true,
                            //   operationTitle: generalConst.update,
                            //   attributeId: attribute.id,
                            // });
                          }}
                        />
                      </Tooltip>{" "}
                    </td>
                  </List.Item>
                )}
              </VirtualList>
            </List>

            {/* <Table
              bordered
              size="small"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    alert("Merhaba");
                  }, // click row
                };
              }}
              columns={columns}
              dataSource={authGroups}
            /> */}
          </Col>
          <Col offset={2} span={12}>
            <List bordered header={<h2>Yetki Listesi</h2>}>
              <List.Item key={1}>
                <Space wrap>
                  {roles.length > 0 ? (
                    roles.map((x) => (
                      <Tag color="default">{x.roleDisplayName}</Tag>
                    ))
                  ) : (
                    <Tag color="red">Role Atanmamış</Tag>
                  )}
                </Space>
              </List.Item>
            </List>
          </Col>
        </Row>
      </Space>
    </>
  );
};
export default AuthGroupIndex;
