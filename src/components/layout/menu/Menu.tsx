import {
  navigationConst,
  productOperations,
  userOperations,
} from "../../../utils/constants/navigation-const";
import { UserOutlined } from "@ant-design/icons";

export const menuList = [
  // {
  //   label: <Input.Search placeholder='Ara...'/>,
  //   key:"search"
  // },
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Ürün İşlemleri",
    children: [
      {
        label: "Nitelik",
        key: navigationConst.attribute,
        link: `${productOperations}/${navigationConst.attribute}`,
      },
      {
        label: "Nitelik Grubu",
        key: navigationConst.attributeGroup,
        link: `${productOperations}/${navigationConst.attributeGroup}`,
      },
      {
        label: "Kategoriler",
        key: navigationConst.category,
        link: `${productOperations}/${navigationConst.category}`,
      },
      {
        label: "Ürün Kartı",
        key: navigationConst.productCard,
        link: `${productOperations}/${navigationConst.productCard}`,
      },
    ],
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: "Kullanıcı İşlemleri",
    children: [
      {
        label: "Kullanıcılar",
        key: "users",
        link: `${userOperations}/${navigationConst.users}`,
      },
      {
        label: "Rol Grup",
        key: "roleGroup",
        link: `${userOperations}/${navigationConst.roleGroup}`,
      },
    ],
  },
];
