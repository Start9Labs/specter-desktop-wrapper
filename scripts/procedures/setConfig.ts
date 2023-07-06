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
      
  return await compat.setConfig(effects, input, {
    ...dependsOnElectrs,
    ...dependsOnBitcoind,
  });
};