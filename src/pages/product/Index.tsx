import { tableColumnTextFilterConfig } from "../../utils/table-antd-util";
import {
  Button,
  Dropdown,
  MenuProps,
  message,
  Popconfirm,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generalConst } from "../../utils/constants/general-const";
import {
  IAddOrUpdatePictureDialog,
  initialModels,
  IProductInPage,
  IProductOutPage,
} from "./page-models";
import Currency from "../../utils/helpers/currency";

import {
  navigationConst,
  productOperations,
} from "../../utils/constants/navigation-const";
import "./style.css";
import { getListProductByPaging } from "../../services/api/product-http";
import { InitialPagedFilter } from "../../utils/paging/paging-request";
import { IProductApiResponse } from "../../models/dtos/product-card/product-card-api-models";
import { initialPagingList } from "../../utils/paging/paging-response";
import { setStrLengthLimitByNumber } from "../../utils/helpers/str-helper";
import {
  PlusSquareOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import AddOrUpdatePictureDialog from "./product-card-add-update/add-update-picture-dialog";

const ProductIndex = () => {
  const navigate = useNavigate();

  const [pageOutState, setPageOutState] = useState<IProductOutPage>(
    new InitialPagedFilter("name", "asc")
  );
  const [pageInState, setPageInState] =
    useState<IProductInPage>(initialPagingList);

  const [pictureDialog, setPictureDialog] = useState<IAddOrUpdatePictureDialog>(
    initialModels.addOrUpdatePictureDialog
  );

  useEffect(() => {
    getListProductByPaging(pageOutState).then((res) => {
      setPageInState(res.data.data);
    });
  }, []);

  const onClose = (isUpdate: boolean) => {
    if (isUpdate) {
    }
    setPictureDialog(initialModels.addOrUpdatePictureDialog);
  };

  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <>
          {" "}
          <Button
            icon={<BarsOutlined />}
            onClick={() => {
              setPictureDialog((prev: any) => ({
                ...prev,
                open: true,
              }));
            }}
          >
            Resim
          </Button>
        </>
      ),
      key: "3",
    },
  ];

  const columns = [
    {
      title: "İsim",
      dataIndex: "name",
    },
    {
      title: "Kısa Açıklama",
      dataIndex: "shortDescription",
      render: (text: string, productCard: IProductApiResponse) =>
        setStrLengthLimitByNumber(productCard.shortDescription, 80),
    },
    {
      title: "Uzun Açıklama",
      dataIndex: "longDescription",
      render: (text: string, productCard: IProductApiResponse) => (
        <Tooltip
          placement="bottom"
          color="red"
          title={productCard.longDescription}
        >
          {setStrLengthLimitByNumber(productCard.longDescription, 80)}
        </Tooltip>
      ),
    },
    {
      title: "Ürün Detayı",
      dataIndex: "productDetail",
      render: (text: string, productCard: IProductApiResponse) => (
        <Tooltip
          placement="bottom"
          color="red"
          title={productCard.productDetail}
        >
          {setStrLengthLimitByNumber(productCard.productDetail, 80)}
        </Tooltip>
      ),
    },
    {
      title: "Ek Bilgi",
      dataIndex: "additionalInfo",
      render: (text: string, productCard: IProductApiResponse) => (
        <Tooltip
          placement="bottom"
          color="red"
          title={productCard.additionalInfo}
        >
          {setStrLengthLimitByNumber(productCard.additionalInfo, 80)}
        </Tooltip>
      ),
    },
    {
      title: "Kategori İsmi",
      dataIndex: "categoryName",
      render: (text: string, productCard: IProductApiResponse) =>
        productCard.categories.map((x) => x.categoryName).join(","),
    },
    {
      title: "Barkod",
      dataIndex: "barcode",
    },
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Satış Fiyatı",
      dataIndex: "salesPrice",
      align: "right" as "right",
      render: (text: string, productCard: IProductApiResponse) => (
        <Currency value={productCard.salesPrice} />
      ),
    },

    {
      key: "operations",
      width: 120,
      render: (text: string, productCard: IProductApiResponse) => (
        <>
          {/* <Tooltip placement="top" color="blue" title={"GÜNCELLE"}>
            <Button
              icon={<EditOutlined />}
              // onClick={() => {
              //   setAddOrUpdateDialogFlags({
              //     ...addOrUpdateDialogFlags,
              //     attributeModalVisible: true,
              //     operationTitle: generalConst.update,
              //     attributeId: attribute.id,
              //   });
              // }}
            />
          </Tooltip>
          <Tooltip placement="bottom" color="red" title={"SİL"}>
            <Popconfirm
              title={generalConst.areYouSureToDelete}
              onConfirm={() => {
                // deleteAttribute(attribute.id);
              }}
              okText={"EVET"}
              cancelText={"HAYIR"}
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip placement="bottom" color="blue" title={"DETAYLAR"}>
            <Button
              icon={<BarsOutlined />}
              onClick={() => {
                navigate(
                  `/${productOperations}/${navigationConst.productCardDetailList}`
                );
              }}
              </Tooltip>
              />
       */}

          <Dropdown menu={{ items }} trigger={["click"]}>
            <a
              onClick={(e) => {
                setPictureDialog((prev: any) => ({
                  ...prev,
                  productCardId: productCard.productCardId,
                }));
                e.preventDefault();
              }}
            >
              <Space>
                İşlemler
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
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
        navigate(
          `/${productOperations}/${navigationConst.productCardAddOrUpdate}`
        );
      }}
    >
      EKLE
    </Button>
  );

  return (
    <>
      <AddOrUpdatePictureDialog dialog={pictureDialog} onClose={onClose} />
      {/* Tag */}
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        {header}
        <Table
          bordered
          size="small"
          columns={columns}
          dataSource={pageInState.items}
        />
      </Space>
    </>
  );
};

export default ProductIndex;
