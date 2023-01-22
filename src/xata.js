// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "items",
    columns: [
      { name: "label", type: "string" },
      { name: "is_done", type: "bool", defaultValue: "false" },
      { name: "user", type: "link", link: { table: "users" } },
    ],
  },
  {
    name: "users",
    columns: [
      { name: "user", type: "string", defaultValue: "undefined" },
      { name: "password", type: "string", defaultValue: "undefined" },
    ],
  },
];
/** @type { import('../../client/src').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:
    "https://Emerenini-Cynthia-Ngozi-s-workspace-l0v0ft.us-west-2.xata.sh/db/todo",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};