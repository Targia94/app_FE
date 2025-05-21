import { User } from "supertokens-node";
import { GenericAuthData } from "./auth";
import { UserT } from "./user";

type ExtraFields = {
  roles: string[];
  full_name: string;
}

/**
 * Users
 */

export interface UsersData {
  users: User[];
  nextPaginationToken?: string;
}
export interface UsersDataDb {
  users: UserT[];
}

export interface UserData extends GenericAuthData {
  user: User & ExtraFields;
}

/**
 * Roles
 */

export interface RolesData extends GenericAuthData {
  roles: string[];
}

/**
 * Permissions
 */

export interface PermissionsData extends GenericAuthData {
  permissions: string[];
}

/* Roles-rda
 */

export interface UserEmail{
  parent_usr_uid: string;
  default_email: string;
}

export interface ResponseUserEmail{
  status: string;
  users: UserEmail[];
}