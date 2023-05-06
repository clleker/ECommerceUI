//https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-js-fetch-api
export const uploadType = {
  headers: { "Content-Type": "multipart/form-data;" },
};
export const API_ENDPOINTS_CONST = {
  //------------Attribute-------------------
  getAttributeList: "attributes/getList",
  addAttribute: "attributes/add",
  updateAttribute: "attributes/update",
  deleteAttribute: "attributes/delete",
  getByAttributeId: "attributes/getById",
  //---------------AttributeGroup------------
  getAttributeGroupList: "attributeGroups/getList",
  addAttributeGroup: "attributeGroups/add",
  deleteAttributeGroup: "attributeGroups/delete",
  getByAttributeGroupId: "attributeGroups/getById",
  updateAttributeGroup: "attributeGroups/update",
  //--------------AuthGroup-----------------
  getAuthGroupList: "authgroups/getList",
  addAuthGroupWithRoles: "authgroups/addWithRoles",
  //---------------ProductCard------------
  getProductCardList: "productCards/getList",
  addProductCard: "productCards/add",
  deleteProductCard: "productCards/delete",
  getByProductCardId: "productCards/getById",
  updateProductCard: "productCards/update",
  //----------------ProductCardPicture-------
  addPicturesToProduct: "productCardPictures/addPicturesToProduct",
  getProductCardPictureList: "productCardPictures/getPicturesByProductCardId",
  //---------------Product------------
  getExtendedProductCardList: "productCards/getExtendedProductCardList",
  //---------------Category------------
  getCategoryList: "Categories/getList",
  addCategory: "Categories/add",
  deleteCategory: "Categories/delete",
  getByCategoryId: "Categories/getById",
  updateCategory: "Categories/update",
  //---------------Auth--------------
  login: "UserAuths/login",

  //-------------Role---------------
  getRoleListByPaging: "roles/getRoleListByPaging",
  getRoleListByAuthGroupId: "roles/getRoleListByAuthGroupId",
  //-------------User---------------
  getUserList: "Users/getList",
  updateUser: "Users/update",
  getUserById: "Users/getById",
  deleteUser: "Users/delete",
  addUser: "Users/add",
};
