import { randomUUID } from "node:crypto";
import { GA4_URL } from "./utils/constants.js";
import { getOS } from "./utils/helpers.js";
import { Selections } from "./types.js";

export const recordTelemetry = async (selection: Selections) => {
  try {
    const telemetry = {
      client_id: randomUUID(), // We generate a random client id for each request
      user_id: randomUUID(), // can we find a better way of identifying each CLI user?
      timestamp_micros: (Date.now() * 1000).toString(),
      events: [
        {
          name: "wizard_command",
          params: {
            command: "npx create-aptos-dapp", // TODO make it generic once --example is introduced
            project_name: selection.projectName,
            template: selection.template.name,
            network: selection.network,
            os: getOS(),
          },
        },
      ],
    };
    const res = await fetch(GA4_URL, {
      method: "POST",
      body: JSON.stringify(telemetry),
      headers: { "content-type": "application/json" },
    });
    // this is helpful when using GA4_URL_DEBUG to debug GA4 query. GA4_URL does not return any body response back
    if (res.body) {
      const resJson = await res.json();
      console.log("ga4 debug response", resJson);
    }
  } catch (err: any) {
    console.log("could not record telemetry data", err);
  }
};
