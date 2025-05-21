const port = process.env.NEXT_PUBLIC_APP_PORT || 3000;

const apiBasePath = "/api/auth/";

export const websiteDomain = process.env.NEXT_PUBLIC_WEB_URL || `http://localhost:${port}`;
export const apiDomain = process.env.NEXT_PUBLIC_SUPERTOKEN_API_DOMAIN || "http://localhost:3000"
export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: "montarreda-app",
  apiDomain,
  websiteDomain,
  apiBasePath: apiBasePath,
  websiteBasePath: "/"
}

