import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import AttributeIndex from "./pages/attribute";
import AttributeGroupIndex from "./pages/attribute-group";
import CategoryIndex from "./pages/category";
import Dashboard from "./pages/dashboard/Index";
import AddOrUpdateProductSteps from "./pages/product/product-card-add-update/add-update-steps";
import ProductIndex from "./pages/product/Index";
import LoginIndex from "./pages/login/Index";
import UserIndex from "./pages/user/Index";
import AuthGroupIndex from "./pages/auth-group/Index";
import {
  navigationConst,
  productOperations,
  userOperations,
} from "./utils/constants/navigation-const";
import ProductCardIndex from "./pages/product/product-card";

function AppRouter(props: any) {
  const { isLogin } = props;

  const authorized = (
    <Route element={<LayoutAdmin />}>
      <Route path="/" element={<Dashboard />} />{" "}
      {/*index parametresi Layoutu temsil eder */}
      <Route path={productOperations}>
        <Route path={navigationConst.attribute} element={<AttributeIndex />} />
        <Route
          path={navigationConst.attributeGroup}
          element={<AttributeGroupIndex />}
        />
        <Route path={navigationConst.category} element={<CategoryIndex />} />

        <Route path={navigationConst.productCard} element={<ProductIndex />} />
        <Route
          path={navigationConst.productCardAddOrUpdate}
          element={<AddOrUpdateProductSteps />}
        />
        <Route
          path={navigationConst.productCardDetailList}
          element={<ProductCardIndex />}
        />
      </Route>
      <Route path={userOperations}>
        <Route path={navigationConst.users} element={<UserIndex />}></Route>
        <Route
          path={navigationConst.roleGroup}
          element={<AuthGroupIndex />}
        ></Route>
      </Route>
    </Route>
  );

  const unauthorized = <Route path={`/*`} element={<LoginIndex />}></Route>;

  return (
    <BrowserRouter>
      <Routes>{isLogin ? authorized : unauthorized}</Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: any) => {
  debugger;
  return {
    isLogin: state.authReducer,
  };
};

export default connect(mapStateToProps)(AppRouter);
