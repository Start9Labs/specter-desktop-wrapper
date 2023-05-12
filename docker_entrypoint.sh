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
BLOCK_EXPLORER="$(yq e '.block-explorer' /root/start9/config.yaml)"
MEMPOOL_LAN_ADDRESS="$(yq e '.mempool-lan-address' /root/start9/config.yaml)"
echo $MEMPOOL_LAN_ADDRESS

if [ ! -f /root/.specter/config.json ]; then
    # File doesn't exist
    echo "File /root/.specter/config.json not found"
    echo "Starting specter server for 5 seconds..."
    python3 -m cryptoadvance.specter server --host 0.0.0.0 &
    pid=$!  # Save process ID
    sleep 5  # Wait for 5 seconds
    kill $pid  # Kill the process
    echo "Specter server killed"
fi

if [ "$BTC_RPC_TYPE" = "internal-proxy" ]; then
  jq '.active_node_alias = "bitcoin_proxy"' /root/.specter/config.json > /root/.specter/config.tmp && mv /root/.specter/config.tmp /root/.specter/config.json
  cat <<EOF > /root/.specter/nodes/bitcoin_proxy.json
{
    "python_class": "cryptoadvance.specter.node.Node",
    "fullpath": "/root/.specter/nodes/bitcoin_proxy.json",
    "name": "Bitcoin Proxy",
    "alias": "bitcoin_proxy",
    "autodetect": false,
    "datadir": "",
    "user": "$BTC_RPC_USER",
    "password": "$BTC_RPC_PASSWORD",
    "port": "8332",
    "host": "btc-rpc-proxy.embassy",
    "protocol": "http",
    "node_type": "BTC"
}
EOF
rm -f /root/.specter/nodes/spectrum_node.json

elif [ "$BTC_RPC_TYPE" = "electrs" ]; then
  jq '.active_node_alias = "spectrum_node"' /root/.specter/config.json > /root/.specter/config.tmp && mv /root/.specter/config.tmp /root/.specter/config.json
  cat <<EOF > /root/.specter/nodes/spectrum_node.json
{
    "python_class": "cryptoadvance.specterext.spectrum.spectrum_node.SpectrumNode",
    "fullpath": "/root/.specter/nodes/spectrum_node.json",
    "name": "Spectrum Node",
    "alias": "spectrum_node",
    "host": "electrs.embassy",
    "port": 50001,
    "ssl": false
}
EOF

elif [ "$BTC_RPC_TYPE" = "internal" ]; then
  jq '.active_node_alias = "bitcoin_core"' /root/.specter/config.json > /root/.specter/config.tmp && mv /root/.specter/config.tmp /root/.specter/config.json
  cat <<EOF > /root/.specter/nodes/bitcoin_core.json
{
    "python_class": "cryptoadvance.specter.node.Node",
    "fullpath": "/root/.specter/nodes/bitcoin_core.json",
    "name": "Bitcoin Core",
    "alias": "bitcoin_core",
    "autodetect": false,
    "datadir": "",
    "user": "$BTC_RPC_USER",
    "password": "$BTC_RPC_PASSWORD",
    "port": "8332",
    "host": "bitcoind.embassy",
    "protocol": "http",
    "node_type": "BTC"
}
EOF

rm -f /root/.specter/nodes/spectrum_node.json

fi

if [ "$BLOCK_EXPLORER" = "true" ]; then
  #Use jq to edit the config file
  jq '.explorers.main = "https://'"$MEMPOOL_LAN_ADDRESS"'/"' /root/.specter/config.json > tmp.json && mv tmp.json /root/.specter/config.json
fi

python3 -m cryptoadvance.specter server --host 0.0.0.0 &
specter_process=$!
trap _term TERM
wait $specter_process
