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
  const dependsOnElectrs: { [key: string]: string[] } = newConfig?.bitcoind?.type === "electrs"  ? { electrs: ["synced"] } : {};
  const dependsOnMempool: T.DependsOn = newConfig?.["block-explorer"]  ? { mempool: ["enable-electrs"] } : {};
  // const dependsOnElectrs: { [key: string]: string[] } = newConfig?.[
  //   "bitcoind.type"
  // ]
    // ? { electrs: ["synced"] }
    // : {};
  const dependsOnBitcoind: { [key: string]: string[] } = newConfig?.txindex
    ? { bitcoind: [] }
    : {};
    
  return compat.setConfig(effects, newConfig, {
    ...dependsOnElectrs,
    ...dependsOnBitcoind,
    ...dependsOnMempool,
  });
};