#!/bin/bash
set -a 
_term() { 
  echo "Caught SIGTERM signal!" 
  kill -TERM "$specter_process" 2>/dev/null
}
# Setting variables
echo "Configuring Specter..."
BTC_RPC_TYPE="$(yq e '.bitcoind.type' /root/start9/config.yaml)"
BTC_RPC_USER="$(yq e '.bitcoind.user' /root/start9/config.yaml)"
BTC_RPC_PASSWORD="$(yq e '.bitcoind.password' /root/start9/config.yaml)"

if [ "$BTC_RPC_TYPE" = "internal-proxy" ]; then
  jq '.active_node_alias = "Bitcoin Proxy"' /root/.specter/config.json > /root/.specter/config.tmp && mv /root/.specter/config.tmp /root/.specter/config.json
elif [ "$BTC_RPC_TYPE" = "electrs" ]; then
  jq '.active_node_alias = "spectrum_node"' /root/.specter/config.json > /root/.specter/config.tmp && mv /root/.specter/config.tmp /root/.specter/config.json
elif [ "$BTC_RPC_TYPE" = "internal" ]; then
  jq '.active_node_alias = "Bitcoin"' /root/.specter/config.json > /root/.specter/config.tmp && mv /root/.specter/config.tmp /root/.specter/config.json
fi

python3 -m cryptoadvance.specter server --host 0.0.0.0 &
specter_process=$!
trap _term TERM
wait $specter_process
