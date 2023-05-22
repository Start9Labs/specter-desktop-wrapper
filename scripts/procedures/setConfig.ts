import {
  types as T,
  compat,
} from "../deps.ts";

export const setConfig: T.ExpectedExports.setConfig = async (
  effects: T.Effects,
  input
) => {
  // deno-lint-ignore no-explicit-any
  const newConfig = input as any;
  
  const dependsOnElectrs: T.DependsOn = newConfig?.bitcoind?.type === "electrs"  ? { electrs: ["synced"] } : {};
  const dependsOnBitcoind: T.DependsOn = newConfig?.bitcoind?.type  === "internal" ? { bitcoind: [] }  : {};
  const dependsOnProxy: T.DependsOn = newConfig?.bitcoind?.type  === "internal-proxy" ? { "btc-rpc-proxy": [] }  : {};
  
  // add a dependency on mempool if block explorer is enabled in the config
  const dependsOnMempool: T.DependsOn = newConfig["block-explorer"] ? { mempool: [] } : {};
    
  return await compat.setConfig(effects, input, {
    ...dependsOnElectrs,
    ...dependsOnBitcoind,
    ...dependsOnProxy,
    ...dependsOnMempool,
  });
};