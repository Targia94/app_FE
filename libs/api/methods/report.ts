import client from "../client";
import { Params } from "../types";
import { Report } from "../types/report";

export const sendReport = (body: any) => {
    return client.request<Report>({
      action: "sendReport",
      body
    });
  }