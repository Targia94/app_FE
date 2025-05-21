export interface SessionData {
  id: string;
  createdAt: Date | string;
  email: string;
  roles: string[];
  full_name: string;
  out_office: boolean;
  role_rda:any[]
}

export interface GenericAuthData {
  status: string;
}

export interface ResetPasswordData extends GenericAuthData {
  link: string;
}