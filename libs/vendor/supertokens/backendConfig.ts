import EmailPasswordNode from 'supertokens-node/recipe/emailpassword';
import SessionNode from 'supertokens-node/recipe/session';
import { appInfo } from './appInfo';
import { TypeInput } from "supertokens-node/types";
import UserRoles from "supertokens-node/recipe/userroles";
// import Dashboard from "supertokens-node/recipe/dashboard";
import { SMTPService } from "supertokens-node/recipe/emailpassword/emaildelivery";
export const backendConfig = (): TypeInput => {
  const connectionURI = process.env.NEXT_PUBLIC_SUPERTOKEN_CORE_URL || "";
  const host = process.env.NEXT_PUBLIC_SMTP_HOST || "";
  const authUsername = process.env.NEXT_PUBLIC_SMTP_AUTH_USERNAME || "";
  const password = process.env.NEXT_PUBLIC_SMTP_PASSWORD || "";
  const port = Number(process.env.NEXT_PUBLIC_SMTP_PORT) || 465;
  const name = process.env.NEXT_PUBLIC_SMTP_FROM_NAME || "";
  const email = process.env.NEXT_PUBLIC_SMTP_EMAIL || "";
  let smtpSettings = {
    host,
    authUsername,
    password,
    port,
    from: {
        name,
        email,
    },
    secure: true
}
  return {
    framework: "express",
    supertokens: {
      connectionURI
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init({
        emailDelivery: {
          service: new SMTPService({smtpSettings})
      },
      }),
      SessionNode.init(),
      UserRoles.init(),
      // Dashboard.init(),
    ],
    isInServerlessEnv: true,
  }
}
