# Connecting to the bitcoin network

Specter can be configured to connect to the bitcoin network via Bitcoin Core - this is the default option and is the least demanding on your server. However it will be very slow to rescan after adding a new wallet. Electrs can be used instead which will be far faster, but is not advisible if you are running less powerful hardware.

You can also connect via Bitcoin Proxy which is the same as connecting directly to Bitcoin Core but allows you to be running a pruned node rather than an archival node. If you are running a Server Lite this is the correct choice.

# Using a Signing Device with Specter

There are two ways to create a wallet from a signing device using Specter

Some signing devices permit you to "air gap" which means transferring the xpub (and subsequent unsigned/signed transactions) back and forth between Specter and the signing device via an SD card (Coldcard for example) - other devices require a direct USB connection between the device and Specter (Trezor One for example).

## USB Connected Signing Devices:

For devices like the Trezor One, air gapping is not possible. This means importing xpubs via USB - Specter permits this via the HWI which requires running a second instance of Specter on your *local* machine (i.e *not* your Embassy).

For detailed instructions on how to use signing devices see our documentation [here](https://docs.start9.com/latest/user-manual/service-guides/specter/specter-service)