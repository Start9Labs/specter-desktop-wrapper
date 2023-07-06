import { compat, types } from "../deps.ts";


export const getConfig: types.ExpectedExports.getConfig = compat.getConfig({
  "bitcoind": {
    "type": "union",
    "name": "Bitcoin Core",
    "description": "The Bitcoin Core node for Specter to connect to",
    "tag": {
      "id": "type",
      "name": "Type",
      "description":
        "Choose between Bitcoin Core and Electrs. Bitcoin Core is the default and will work great. Electrs will provide the best overall experience but will require additional resource usage from your server.",
      "variant-names": {
        "internal": "Bitcoin Core",
        "electrs": "Electrs",
      },
    },
    "default": "internal",
    "variants": {
      "internal": {
        "user": {
          "type": "pointer",
          "name": "RPC Username",
          "description": "The username for the RPC user for Bitcoin Core",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "selector": "$.rpc.username",
          "multi": false,
        },
        "password": {
          "type": "pointer",
          "name": "RPC Password",
          "description": "The password for the RPC user for Bitcoin Core",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "selector": "$.rpc.password",
          "multi": false,
        },
      },
      "electrs": {},
    },
  }
})
