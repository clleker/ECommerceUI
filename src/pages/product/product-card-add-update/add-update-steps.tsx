import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Steps,
  Table,
} from "antd";
import { PictureOutlined, UploadOutlined } from "@ant-design/icons";
import { generalConst } from "../../../utils/constants/general-const";
import {
  initialProductCard,
  IProductCardAttributeAndPrice,
  IProductCard,
} from "../page-models";
import * as apiAttribute from "../../../services/api/attribute-http";
import * as apiAttributeGroup from "../../../services/api/attribute-group-http";
import * as apiProductCard from "../../../services/api/product-http";

import { nameof } from "../../../utils/common-utils";
import TextArea from "antd/lib/input/TextArea";
import "../style.css";
import { IAttributeResponse } from "../../../models/dtos/attribute/attribute-models";
import { IAttributeGroupResponse } from "../../../models/dtos/attribute-group/attribute-group-api-models";
import {
  convertStrCurrencyToFloat,
  inputMaskConfig,
} from "../../../utils/currency-util";
import InputMask from "inputmask";
import { initialModels } from "../page-models";
import { addProductCardForApiMapping } from "../../../models/dtos/product-card/product-card-mapping";
import CategoryDropdown from "../../../components/shared/CategoryDropdown";
import { ProductSteps } from "../../../models/enums/enums";
import { useNavigate } from "react-router";
import {
  navigationConst,
  productOperations,
} from "../../../utils/constants/navigation-const";

export default function AddOrUpdateProductSteps() {
  const navigate = useNavigate();

  const [productCardPage, setProductCardPage] =
    useState<IProductCard>(initialProductCard);

  //Step One
  const [stepOneForm] = Form.useForm();
  const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };
  //Step Two
  const [stepTwoForm] = Form.useForm();
  const [attributes, setAttributes] = useState<IAttributeResponse[]>([]);
  const [attributeGroups, setAttributeGroup] = useState<
    IAttributeGroupResponse[]
  >([]);

  //Step Tree
  const formItemLayoutStepTree = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep === ProductSteps.StepTwo) {
      getAttributeList();
      getAttributeGroupList();
    }
    if (currentStep === ProductSteps.StepTree) {
      const currencyMusk: any = document.getElementsByClassName("currencyMusk");
      InputMask(inputMaskConfig).mask(currencyMusk);
    }
  }, [currentStep]);

  useEffect(() => {}, []);

  const getAttributeList = () => {
    apiAttribute.getList().then((result) => {
      setAttributes(result.data.data);
    });
  };

  const getAttributeGroupList = () => {
    apiAttributeGroup.getList().then((result) => {
      setAttributeGroup(result.data.data);
    });
  };

  const onChangeAttribute = (attributeId: any) => {
    const result = attributes.find((x) => x.id == attributeId);
    if (!result) return;

    // attributeGroupTreeData.forEach((x) => {
    //   if (x.key == selectedNode.key)
    //     x.children?.push({
    //       icon: <CarryOutOutlined />,
    //       title: result.name,
    //       key: `${x.key}-${result.id}`,
    //       isLeaf: true,
    //     });
    // });

    // const newList = removeItem<DataNode>(attributeGroupTreeData, selectedNode);
    // setAttributeGroupTreeData(attributeGroupTreeData);
  };

  //#region StepOne

  const stepByStepToFillProductCard = (productCard: IProductCard) => {
    setProductCardPage((prev) => ({
      ...prev,
      name: productCard.name,
      longDescription: productCard.longDescription,
      productDetail: productCard.productDetail,
      shortDescription: productCard.shortDescription,
      additionalInfo: productCard.additionalInfo,
      categoryIds: productCard.categoryIds,
    }));
  };

  const stepOneHtml = (
    <>
      <div className="separate-20"></div>
      <Form
        form={stepOneForm}
        {...formItemLayout}
        layout={"horizontal"}
        onFinish={stepByStepToFillProductCard}
        size={"middle"}
        labelAlign={"left"}
      >
        <Row>
          <Col span={12}>
            <Form.Item name={"id"} hidden={true} initialValue={0}>
              <Input />
            </Form.Item>
            <Form.Item
              label={"Ürün İsmi"}
              name={nameof<IProductCard>("name")}
              rules={[{ required: true, message: generalConst.required_field }]}
            >
              <Input placeholder={"Ürün İsmi"} />
            </Form.Item>

            <Form.Item
              label={"Uzun Açıklama"}
              name={nameof<IProductCard>("longDescription")}
              rules={[{ required: true, message: generalConst.required_field }]}
            >
              <TextArea rows={4} placeholder={"Uzun Açıklama"} />
            </Form.Item>
            <Form.Item
              label={"Ürün Açıklama"}
              name={nameof<IProductCard>("productDetail")}
              rules={[{ required: true, message: generalConst.required_field }]}
            >
              <TextArea rows={4} placeholder={"Ürün Açıklama"} />
            </Form.Item>
            <Form.Item
              label={"Ek Bilgi"}
              name={nameof<IProductCard>("additionalInfo")}
            >
              <TextArea rows={4} placeholder={"Ek bilgi"} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={"Kısa Açıklama"}
              name={nameof<IProductCard>("shortDescription")}
              rules={[{ required: true, message: generalConst.required_field }]}
            >
              <Input placeholder={"Kısa Açıklama"} />
            </Form.Item>
            <CategoryDropdown
              mode="multiple"
              name={nameof<IProductCard>("categoryIds")}
              label={"Kategoriler"}
              rules={[{ required: true, message: generalConst.required_field }]}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
  //#endregion

  //#region StepTwo

  const formSubmitAttributeGroup = (formValues: any) => {
    //#region  preConditions
    const resultAttrGroup = attributeGroups.find(
      (x) => x.id === formValues.attributeGroupId
    );

    const resultAttr = attributes.filter((x) =>
      formValues.attributeIds.some((id: number) => id == x.id)
    );

    const attrGroup = productCardPage.productAttributeGroups;

    //2. if result is null or  there is the same a record then don't add (Precondition)
    if (
      !resultAttrGroup ||
      attrGroup.find(
        (x: { attributeGroupId: any }) =>
          x.attributeGroupId === resultAttrGroup.id
      ) ||
      resultAttr.length === 0
    ) {
      message.warning("Aynı Nitelik Grubu Eklenemez");
      return;
    }

    //#endregion
    debugger;
    //#region calcMatrix
    //if the array has an item , go to last element than transaction
    const lastElement = attrGroup[attrGroup.length - 1];
    let newArr: IProductCardAttributeAndPrice[] = [];
    if (lastElement) {
      for (let i = 0; i < resultAttr.length; i++) {
        for (let k = 0; k < lastElement.productCardAttributes.length; k++) {
          newArr.push({
            key: k,
            attributeId: resultAttr[i].id,
            name: `${resultAttr[i].name} -- ${lastElement.productCardAttributes[k].name}`,
            parent: {
              id: lastElement.productCardAttributes[k].attributeId,
              name: `${lastElement.productCardAttributes[k].name}`,
            },
            barcode: "",
            sku: "",
            salesPrice: 0,
            includingVatPrice: 0,
          });
        }
      }
    } else {
      for (let i = 0; i < resultAttr.length; i++) {
        newArr.push({
          key: i,
          attributeId: resultAttr[i].id,
          name: resultAttr[i].name,
          parent: undefined,
          barcode: "",
          sku: "",
          salesPrice: 0,
          includingVatPrice: 0,
        });
      }
    }
    //#endregion

    //3. update the state
    attrGroup.push({
      attributeGroupId: resultAttrGroup?.id,
      name: resultAttrGroup?.title,
      productCardAttributes: newArr,
    });

    setProductCardPage((prev: any) => ({
      ...prev,
      attributeGroupIds: attrGroup,
    }));

    console.log(productCardPage);
    stepTwoForm.resetFields();
  };

  const stepTwoHtml = (
    <>
      <div className="separate-20"></div>
      <Row>
        <Col span={24}>
          <Form
            form={stepTwoForm}
            {...formItemLayoutStepTree}
            layout={"horizontal"}
            onFinish={formSubmitAttributeGroup}
            size={"middle"}
            labelAlign={"left"}
          >
            <Space size={"large"}>
              <Form.Item
                label={"Nitelik Grubu"}
                name={"attributeGroupId"}
                rules={[
                  { required: true, message: generalConst.required_field },
                ]}
              >
                <Select
                  style={{ width: "200px" }}
                  showSearch
                  placeholder="Nitelik Grubu"
                  optionFilterProp="children"
                  options={attributeGroups?.map((x) => ({
                    value: x.id,
                    label: x.title,
                    key: x.id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label={"Nitelik Grubu"}
                name="attributeIds"
                rules={[
                  { required: true, message: generalConst.required_field },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "200px" }}
                  placeholder="Nitelik"
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  disabled={false}
                  onChange={onChangeAttribute}
                  options={attributes?.map((x) => ({
                    value: x.id,
                    label: x.name,
                    key: x.id,
                  }))}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  +
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Col>
        <Col span={12}></Col>
      </Row>
      <div className="separate-20"></div>
      <Row>
        {productCardPage.productAttributeGroups.map((x) => (
          <Descriptions title={x.name}>
            {x.productCardAttributes.map((y) => (
              <>
                <Descriptions.Item>{y.name}</Descriptions.Item>
              </>
            ))}
          </Descriptions>
        ))}
      </Row>
      <Button type="primary" danger>
        {" "}
        SİL{" "}
      </Button>
    </>
  );

  //#endregion

  //#region STEP-TREE
  //Variables
  // const [pictureVariables, setPictureVariables] = useState(
  //   initialModels.pictureVariables
  // );

  const dataSource =
    productCardPage?.productAttributeGroups[
      productCardPage?.productAttributeGroups.length - 1
    ]?.productCardAttributes;

  const onChangeProductCardAttributeAndDetailsBlur = (
    record: IProductCardAttributeAndPrice
  ) => {
    dataSource.forEach((x) => {
      if (x.attributeId == record.attributeId) {
        x = record;
      }
    });
    setProductCardPage(productCardPage);
  };

  const columns = [
    {
      key: "name",
      title: "Ürün İsmi",
      dataIndex: "name",
      width: "30%",
    },
    {
      key: "sku",
      title: "SKU",
      dataIndex: "sku",
      render: (text: string, record: IProductCardAttributeAndPrice) => (
        <>
          <Input
            onBlur={(e) => {
              record.sku = e.target.value;
              onChangeProductCardAttributeAndDetailsBlur(record);
            }}
            placeholder="Sku"
          ></Input>
        </>
      ),
    },
    {
      key: "barcode",
      title: "Barkod",
      dataIndex: "barcode",
      render: (text: string, record: IProductCardAttributeAndPrice) => (
        <>
          <Input
            placeholder="Barkod"
            onBlur={(e) => {
              record.barcode = e.target.value;
              onChangeProductCardAttributeAndDetailsBlur(record);
            }}
          ></Input>
        </>
      ),
    },
    {
      key: "salesPrice",
      title: "Satış Fiyatı",
      dataIndex: "salesPrice",
      render: (text: string, record: IProductCardAttributeAndPrice) => (
        <>
          <Input
            className="currencyMusk"
            placeholder="Satış Fiyatı"
            onBlur={(e) => {
              record.salesPrice = convertStrCurrencyToFloat(e.target.value);
              onChangeProductCardAttributeAndDetailsBlur(record);
            }}
          ></Input>
        </>
      ),
    },
    {
      key: "includingVatPrice",
      title: "KDV'li Fiyatı",
      dataIndex: "includingVatPrice",
      render: (text: string, record: IProductCardAttributeAndPrice) => (
        <>
          <Input
            className="currencyMusk"
            name="includingVatPrice"
            onBlur={(e) => {
              record.includingVatPrice = convertStrCurrencyToFloat(
                e.target.value
              );
              onChangeProductCardAttributeAndDetailsBlur(record);
            }}
            placeholder="KDV Fiyat"
          ></Input>
        </>
      ),
    },
    {
      key: "operations",
      width: 120,
      render: (text: string, attribute: IProductCardAttributeAndPrice) => (
        <>
          {/* <Tooltip placement="top" color="blue" title={"RESİMLER"}>
            <Button
              icon={<PictureOutlined />}
              onClick={() => {
                setPictureVariables((prev) => ({
                  ...prev,
                  pictureModalVisible: true,
                  attributeId: attribute.attributeId,
                }));
              }}
            />
          </Tooltip> */}
        </>
      ),
    },
  ];

  const stepTreeHtml = (
    <>
      <div className="separate-20"></div>
      {/* <Form form={form} component={false}> */}
      <Table
        rowClassName={() => "editable-row"}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />
      {/* </Form> */}
    </>
  );

  //#endregion

  const completeProductCardProcessing = () => {
    const result = addProductCardForApiMapping(productCardPage);
    debugger;
    apiProductCard.Add(result).then((response) => {
      if (response.status === 200) {
        message.success(generalConst.operationSuccess);
        navigate(
          `/${productOperations}/${navigationConst.productCardDetailList}`
        );
      }
    });
  };

  //#region Steps
  const steps = [
    {
      title: "Ürün Bilgileri",
      content: stepOneHtml,
    },
    {
      title: "Ürün Nitelikleri",
      content: stepTwoHtml,
    },
    {
      title: "Ürün Fiyatları",
      content: stepTreeHtml,
    },
  ];

  const next = () => {
    switch (currentStep) {
      case ProductSteps.StepOne:
        stepOneForm.validateFields().then((x) => {
          stepOneForm.submit();
          setCurrentStep(currentStep + 1);
        });
        break;
      case ProductSteps.StepTwo:
        setCurrentStep(currentStep + 1);
        break;
      default:
        break;
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps size="default" current={currentStep} items={items} />
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button className={"step-btn"} type="primary" onClick={() => next()}>
            İleri
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            className={"step-btn"}
            type="primary"
            onClick={() => completeProductCardProcessing()}
          >
            Kaydet
          </Button>
        )}
        {currentStep > 0 && (
          <Button
            className={"step-btn"}
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            Geri
          </Button>
        )}
      </div>
    </>
  );
  //#endregion
}
