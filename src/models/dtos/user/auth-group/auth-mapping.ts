import { IAuthGroupForm } from "../../../../pages/auth-group/page-models";
import { ILoginPage } from "../../../../pages/login/page-models";
import { AuthGroupAddApiRequest } from "./auth-group-api-models";

//#region   UI --> Api
export const map = (input: IAuthGroupForm): AuthGroupAddApiRequest => {
  const output: AuthGroupAddApiRequest = {
    name: input.name,
    roleIds: input.roleIds,
  };
  return output;
};
