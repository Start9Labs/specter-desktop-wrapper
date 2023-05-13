import {
  types as T,
  compat,
} from "../deps.ts";
//export const setConfig: T.ExpectedExports.setConfig = compat.setConfig

// deno-lint-ignore require-await
export const setConfig: T.ExpectedExports.setConfig = async (
  effects: T.Effects,
  input
) => {
  const newConfig = input as any;
  const dependsOnElectrs: { [key: string]: string[] } = newConfig?.bitcoind?.type === "electrs"  ? { electrs: ["synced"] } : {};
  
  // add a dependency on mempool if block explorer is enabled in the config
  const dependsOnMempool: { [key: string]: string[] } = newConfig?.["block-explorer"] ? { mempool: [] }  : {};
  // const dependsOnMempool: T.DependsOn = newConfig?.["block-explorer"]  ? { mempool: ["enable-electrs"] } : {};


  
  const dependsOnBitcoind: { [key: string]: string[] } = newConfig?.txindex  ? { bitcoind: [] }  : {};
    
  return compat.setConfig(effects, newConfig, {
    ...dependsOnElectrs,
    ...dependsOnBitcoind,
    ...dependsOnMempool,
  });
};