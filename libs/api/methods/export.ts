import client from "../client";
import { Params } from "../types";

export const exportRichieste = (body: Params) => {
    return client.request({
      action: "exportRichieste",
      body,      
    });
}

export const exportRichiesteAccettate = (body: Params) => {
  return client.request({
    action: "exportRichiesteAccettate",
    body,      
  });
}

