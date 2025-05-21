import { Department } from "./department";
import { UserT } from "./user";

export interface UserDepartment{
    id: number;
    department_id: string;
    role_id: string;
    supertoken_uid: string;
    departments: Department;
    users: UserT;
}

