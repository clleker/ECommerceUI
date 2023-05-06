import { tableColumnTextFilterConfig } from "../../utils/table-antd-util";
import * as apiCategory from "../../services/api/category-http";
import { Button, message, Popconfirm, Space, Table, Tooltip } from "antd";
import { useState, useEffect } from "react";

import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { generalConst } from "../../utils/constants/general-const";
import {
  IAddOrUpdateCategoryDialogFlags,
  ICategoryPage,
  initialModels,
} from "./page-models";
import { ICategoryResponse } from "../../models/dtos/category/category-api-models";
import { mappingForPage } from "../../models/dtos/category/category-mapping";
import AddOrUpdateCategoryDialog from "./add-update-dialog";

const CategoryIndex = () => {
  //Dialog Modal
  const [addOrUpdateDialogFlags, setAddOrUpdateDialogFlags] =
    useState<IAddOrUpdateCategoryDialogFlags>(
      initialModels.addOrUpdateDialogFlags
    );

  const [categories, setCategories] = useState<ICategoryPage[]>([]); //initial value

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    apiCategory.getList().then((result) => {
      setCategories(mappingForPage(result.data.data as ICategoryResponse[]));
    });
  };

  const deleteCategory = (id: number) => {
    apiCategory.deleteCategory(id).then((response) => {
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
      title: "Icon",
      dataIndex: "iconImage",
      render: (_: string, category: ICategoryPage) => (
        <img
          src={`${process.env.REACT_APP_BLOG_URL}/${category.iconImage}`}
          className="img"
          alt="My image"
          style={{ width: "75px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Kategori İsmi",
      dataIndex: "name",
      render: (text: string) => text,
      ...tableColumnTextFilterConfig<ICategoryPage>(),
      onFilter: (value: any, record: ICategoryPage) => {
        return record.name
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
    },
    {
      title: "Üst Kategori",
      dataIndex: "parentCategoryName",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Meta Keywords",
      dataIndex: "metaKeywords",
    },
    {
      title: "Meta Description",
      dataIndex: "metaDescription",
    },
    {
      title: "Meta Title",
      dataIndex: "metaTitle",
    },
    {
      key: "operations",
      width: 120,
      render: (text: string, category: ICategoryPage) => (
        <>
          <Tooltip placement="top" color="blue" title={"GÜNCELLE"}>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setAddOrUpdateDialogFlags({
                  ...addOrUpdateDialogFlags,
                  categoryModalVisible: true,
                  operationTitle: generalConst.update,
                  categoryId: category.id,
                });
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" color="red" title={"SİL"}>
            <Popconfirm
              title={generalConst.areYouSureToDelete}
              onConfirm={() => {
                deleteCategory(category.id);
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
          categoryModalVisible: true,
          operationTitle: generalConst.add,
        });
      }}
    >
      EKLE
    </Button>
  );

  return (
    <>
      <AddOrUpdateCategoryDialog
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
          dataSource={categories}
        />
      </Space>
    </>
  );
};

export default CategoryIndex;
