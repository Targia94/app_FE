import client from "../client";
import { Params } from "../types";
import { PermissionsData, ResponseUserEmail, RolesData, UserData, UserEmail, UsersData, UsersDataDb } from "../types/admin";
import { GenericAuthData, SessionData } from "../types/auth";
import { CdcDepartment } from "../types/cdcDepartment";
import { CentriCosto } from "../types/costCenter";
import { Department } from "../types/department";
import { UserT } from "../types/user";
import { UserDepartment } from "../types/userDepartment";


/**
 * Users
 */

export const getUsersAPI = (queryParams?: Params) => {
  return client.request<UsersDataDb>({
    action: "getUsers",
    queryParams
  });
}

export const getUserAPI = (params: Params) => {
  return client.request<UserData>({
    action: "getUser",
    urlParams: { uid: params.uid }
  });
}

export const createUserAPI = (params: Params) => {
  return client.request<UserData>({
    action: "createUser",
    body: {
      email: params.email,
      full_name: params.fullName,
    }
  });
}

export const updateUserAPI = (params: Params) => {
  return client.request<GenericAuthData>({
    action: "updateUser",
    urlParams: { uid: params.uid },
    body: {
      email: params.email,
      password: params.password,
      full_name: params.fullName,
    }
  });
}

export const updateUserOut = (body: Params) => {
  return client.request<SessionData>({
    action: "updateOutOffice",
    body
  });
}

export const deleteUserAPI = (params: Params) => {
  return client.request<GenericAuthData>({
    action: "deleteUser",
    urlParams: { uid: params.uid },
  });
}

export const getUserRolesAPI = (params: Params) => {
  return client.request<RolesData>({
    action: "getUserRoles",
    urlParams: { uid: params.uid },
  });
}

/**
 * Roles
 */

export const getRolesAPI = () => {
  return client.request<RolesData>({
    action: "getRoles"
  });
}

export const createRoleWithPermissionsAPI = (params: Params) => {
  return client.request<GenericAuthData>({
    action: "createRoleWithPermissions",
    body: { roleId: params.roleId },
  });
}

export const deleteRoleAPI = (params: Params) => {
  return client.request<GenericAuthData>({
    action: "deleteRole",
    urlParams: { roleId: params.roleId },
  });
}
export const getUsersRolesAPI = (queryParams: Params) => {
  return client.request<UsersDataDb>({
    action: "getUsersFromRole",
    queryParams
  });
}

export const getUsersExceptRolesAPI = (queryParams: Params) => {
  return client.request<UsersDataDb>({
    action: "getUsersExceptRole",
    queryParams
  });
}

export const addRoleToUserAPI = (params: Params) => {
  return client.request<GenericAuthData>({
    action: "addRoleToUser",
    body: {
      userId: params.userId,
      roleId: params.roleId
    },
  });
}

export const removeRoleToUserAPI = (params: Params) => {
  return client.request<GenericAuthData>({
    action: "removeRoleToUser",
    body: {
      userId: params.userId,
      roleId: params.roleId
    },
  });
}

/**
 * Permissions
 */

export const getPermissionsForRoleAPI = (params: Params) => {
  return client.request<PermissionsData>({
    action: "getPermissionsForRole",
    urlParams: { roleId: params.roleId },
  });
}

export const removePermissionsForRoleAPI = (params: Params) => {
  return client.request<GenericAuthData>({
    action: "removePermissionsForRole",
    urlParams: { roleId: params.roleId },
    body: { permissions: params.permissions }
  });
}

/* 
  Department
*/

export const getDepartments = (queryParams?: Params) => {
  return client.request<Department[]>({
    action: "getDepartments",
    queryParams
  });
}


export const createDeparrtment = (body: Params) => {
  return client.request<Department>({
    action: "createDepartment",
    body
  });
}

export const deleteDepartment= (queryParams: Params) => {
  return client.request<Department>({
    action: "deleteDepartment",
    queryParams
  });
}

/* 
  CostCenter
*/
export const getCdc = (queryParams: Params) => {
  return client.request<CentriCosto[]>({
    action: "getCdcs",
    queryParams
  });
}

export const getCdcDepartment = (queryParams: Params) => {
  return client.request<CentriCosto[]>({
    action: "getCdcDepartment",
    queryParams
  });
}

export const assignCdcDepratment = (body: Params) => {
  return client.request<CdcDepartment>({
    action: "assignCdcDepartment",
    body
  });
}

export const removeCdcDepartment = (queryParams: Params) => {
  return client.request({
    action: "removeCdcDepartment",
    queryParams
  });
}

/* 
  User x Department
*/  

export const assignUserDepratment = (body: Params) => {
  return client.request<UserDepartment>({
    action: "assignDepartmentUser",
    body
  });
}

export const getUserDepartment = (queryParams: Params) => {
  return client.request<UserDepartment[]>({
    action: "getDepartmentUser",
    queryParams
  });
}

export const removeDepartmentUser = (queryParams: Params) => {
  return client.request({
    action: "removeDepartmentUser",
    queryParams
  });
}

export const getDepartmentsToAdd = (queryParams?: Params) => {
  return client.request<Department[]>({
    action: "getDepartmentToAssign",
    queryParams
  });
}

/* 
  Department x User
*/  

export const getUserToAdd = (queryParams?: Params) => {
  return client.request<UserT[]>({
    action: "getUserToAssign",
    queryParams
  });
}

export const assignUser = (body: Params) => {
  return client.request<UserDepartment>({
    action: "assignUserToDepartment",
    body
  });
}

export const getAlternateToAdd = (queryParams?: Params) => {
  return client.request<UserT[]>({
    action: "getAlternateToAssign",
    queryParams
  });
}

/* Roles Rda */

export const getUserToAddRda = (queryParams: Params) => {
  return client.request<UsersDataDb>({
    action: "getUserToAddRda",
    queryParams
  });
}

export const getUserRda = (queryParams: Params) => {
  return client.request<UsersDataDb>({
    action: "getUserRda",
    queryParams
  });
}

export const removeUserToRda = (params: Params) => {
  return client.request<GenericAuthData>({
    action: "removeUserToRda",
    body: {
      parentId: params.parentId,
      childId: params.childId
    },
  });
}

export const addSupervisorToL1 = (params: Params) => {
  return client.request<GenericAuthData>({
    action: "addSupervisorToL1",
    body: {
      parentId: params.parentId,
      childId: params.childId
    },
  });
}

export const getTypeParent = (queryParams: Params) => {
  return client.request<ResponseUserEmail>({
    action: "getTypeParent",
    queryParams
  });
}

export const updDefaultMail = (params: Params) => {
  return client.request({
    action: "updDefaultMail",
    body: {
      parentId: params.parentId,
      defaultEmail: params.defaultEmail
    },
  });
}