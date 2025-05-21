import { signIn } from "supertokens-web-js/recipe/emailpassword";
import client from "../client";
import { Params } from "../types";
import { GenericAuthData, ResetPasswordData, SessionData } from "../types/auth";

export const checkSessionAPI = () => {
  return client.request<SessionData>({
    action: "checkSession"
  });
}

// vendor SDK
export const logInAPI = (body: Params) => {
  return signIn({
    formFields: [
      { id: "email", value: body.email as string ?? "" },
      { id: "password", value: body.password as string ?? "" },
    ],
  });
}

export const logOutAPI = () => {
  return client.request<GenericAuthData>({
    action: "logOut"
  });
}

export const changePasswordAPI = (body: Params) => {
  return client.request<GenericAuthData>({
    action: "changePassword",
    body: {
      oldPassword: body.oldPassword,
      newPassword: body.newPassword
    }
  });
}

export const resetPasswordAPI = (body: Params) => {
  return client.request<ResetPasswordData>({
    action: "resetPassword",
    body: {
      email: body.email
    }
  });
}

export const resetPasswordUsingTokenAPI = (body: Params) => {
  return client.request<GenericAuthData>({
    action: "resetPasswordUsingToken",
    body: {
      token: body.token,
      newPassword: body.newPassword
    }
  });
}