import { Form, Input, message, Modal, Select } from "antd";
import { memo, useEffect, useState } from "react";
import { generalConst } from "../../utils/constants/general-const";
import * as apiAuthGroup from "../../services/api/user/auth-group-http";
import * as apiRole from "../../services/api/user/role-http";
import {
  IAddOrUpdateDialogFlags,
  IAuthGroupForm,
  IRoleOutPage,
} from "./page-models";
import { getList } from "../../services/api/attribute-group-http";
import { InitialPagedFilter } from "../../utils/paging/paging-request";
import {
  initialPagingList,
  IPagingResponse,
} from "../../utils/paging/paging-response";
import { IAuthGroupApiResponse } from "../../models/dtos/user/auth-group/auth-group-api-models";
import { IRoleApiResponse } from "../../models/dtos/user/role/role-api-models";
import { map } from "../../models/dtos/user/auth-group/auth-mapping";

export interface IAddOrUpdateProps {
  params: IAddOrUpdateDialogFlags;
  onClose: (isUpdated: boolean) => void;
}

function AddOrUpdateAuthGroupDialog(props: IAddOrUpdateProps) {
  const { params, onClose } = props;
  const [authGroupForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  const [pageOutState, setPageOutState] = useState<IRoleOutPage>(
    new InitialPagedFilter("name", "asc")
  );
  const [pageInState, setPageInState] =
    useState<IPagingResponse<IRoleApiResponse>>(initialPagingList);

  useEffect(() => {
    if (!params.open) {
      authGroupForm.resetFields();
    }
    if (params.authGroupId !== 0) {
      getById();
    }
  }, [params]);

  useEffect(() => {
    apiRole.getListByPaging(pageOutState).then((response) => {
      setPageInState(response.data.data);
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

  const addOrUpdate = (authGroup: IAuthGroupForm) => {
    debugger;
    if (authGroup.id === 0)
      apiAuthGroup.addWithRoles(map(authGroup)).then(apiResult);
    // else apiAttribute.update(attribute).then(apiResult);
  };

  const apiResult = (response: any) => {
    message.success(generalConst.operationSuccess);
    onClose(true);
    getList();
  };

  return (
    <Modal
      forceRender
      title={"Yetki Grubu"}
      open={params.open}
      onCancel={() => {
        onClose(false);
      }}
      onOk={() => {
        authGroupForm.submit();
      }}
      okText={params.operationTitle}
      cancelText={generalConst.cancel}
      // confirmLoading={loading}1
    >
      <Form
        form={authGroupForm}
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
          label={"Yetki Grubu"}
          name="name"
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Input placeholder={"Yetki Grubu"} />
        </Form.Item>
        <Form.Item
          label={"Roller"}
          name={"roleIds"}
          rules={[{ required: true, message: generalConst.required_field }]}
        >
          <Select
            mode={"multiple"}
            showSearch
            placeholder="Seçiniz"
            optionFilterProp="children"
            options={pageInState.items?.map((x) => ({
              value: x.id,
              label: x.displayName,
              key: x.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default memo(
  AddOrUpdateAuthGroupDialog,
  (prev: IAddOrUpdateProps, next: IAddOrUpdateProps) => {
    return prev.params === next.params;
  }
);
