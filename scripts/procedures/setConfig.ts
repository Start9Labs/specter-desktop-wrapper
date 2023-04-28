import {
  types as T,
  compat,
} from "../deps.ts";
//export const setConfig: T.ExpectedExports.setConfig = compat.setConfig

export const setConfig: T.ExpectedExports.setConfig = async (
  effects: T.Effects,
  input
) => {
  const newConfig = input as any;
  const dependsOnElectrs: { [key: string]: string[] } = newConfig?.[
    "enable-electrs"
  ]
    ? { electrs: ["synced"] }
    : {};
  const dependsOnBitcoind: { [key: string]: string[] } = newConfig?.txindex
    ? { bitcoind: [] }
    : {};
    
  return compat.setConfig(effects, newConfig, {
    ...dependsOnElectrs,
    ...dependsOnBitcoind,
  });
};