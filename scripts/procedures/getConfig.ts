import { compat, types } from "../deps.ts";


export const getConfig: types.ExpectedExports.getConfig = compat.getConfig({
  // "mempool-lan-address": {
  //   "name": "LAN Address",
  //   "description": "The LAN address for mempool.",
  //   "type": "pointer",
  //   "subtype": "package",
  //   "package-id": "mempool",
  //   "target": "lan-address",
  //   "interface": "main",
  // },
  "bitcoind": {
    "type": "union",
    "name": "Bitcoin Core",
    "description": "The Bitcoin Core node for Specter to connect to",
    "tag": {
      "id": "type",
      "name": "Type",
      "description":
        "- Bitcoin Core: The Bitcoin Core service installed to your Embassy\n- Bitcoin Proxy: The Bitcoin Proxy service installed on your Embassy\n",
      "variant-names": {
        "internal": "Bitcoin Core",
        "internal-proxy": "Bitcoin Proxy",
        "electrs": "Electrs",
      },
    },
    "default": "electrs",
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
      "internal-proxy": {
        "user": {
          "type": "pointer",
          "name": "RPC Username",
          "description": "The username for the RPC user allocated to Specter",
          "subtype": "package",
          "package-id": "btc-rpc-proxy",
          "target": "config",
          "multi": false,
          "selector": '$.users.[?(@.name == "specter")].name',
        },
        "password": {
          "type": "pointer",
          "name": "RPC Password",
          "description": "The password for the RPC user allocated to Specter",
          "subtype": "package",
          "package-id": "btc-rpc-proxy",
          "target": "config",
          "multi": false,
          "selector": '$.users.[?(@.name == "specter")].password',
        },
      },
      "electrs": {},
    },
  },
  // "block-explorer": {
  //   "name": "Use Mempool service",
  //   "description": "This will open address and transaction links using your own local Mempool service.",
  //   "type": "boolean",
  //   "default": false,
  // },
})
