# Usage Instructions

There are two ways to add a wallet to Specter. Some signing devices permit "air gap" which means transferring the xpub (and subsequent unsigned/signed transactions) back and forth between Specter and the signing device via an SD card (Coldcard for example) - other devices require a direct USB connection between the device and Specter (Trezor One for example).

## USB Connected Signing Devices:

For devices like the Trezor One, air gapping is not possible. This means importing xpubs via USB - Specter permits this via the HWI which requires running a second instance of Specter on your *local* machine (i.e *not* your Embassy).

For this to work, your Embassy and your local machine must be on the same LAN.

-Start by heading to Specter running on your Embassy and clicking on the cog

USB devices

Click "Remote Specter USB connection"

Click "copy" under step 2

Now head to your local machine's HWI settings: http://127.0.0.1:25441/hwi/settings/

Paste in the domain for Specter running on your Embassy and click Update

Now connect your Trezor One or other signing device to your local machine

Head back to Embassy Specter

Click "Save Changes"

Then "Test connection"

You should see this along the top of the screen

You can now click "Add new device"

Select the type of signing device you're using.

Name the device

And click "Get via USB"

Once populated, click "Continue"

You can now "Add new wallet"

Select "Single key wallet", you can select Multisignature wallet if you added more than one device and want to make a multisig wallet.

Select the device or devices that you want to use.

Name the wallet and select the key you want to use.

Select "Scan for existing funds" if you have already used this wallet and wish to establish the transaction history, if this is a brand new wallet this is not necessary.

If you select "rescan" you can refresh the page and watch as your bitcoin node rescans the blockchain for your wallet's history.

## Air Gapped Signing Devices

This part of the guide will go over how to upload an xpub from a device that permits air gapping - in this case a Coldcard.

Power up the Coldcard, enter your pin and any passphrase necessary.

Go down to "Advanced" sd card something something

Insert the SD card into your *local* machine (not the Embassy)

Go back to Specter on your Embassy and click "Add new device"

Click Coldcard (or whatever signing device you are using that permits airgapping)

Name the device

Click "Upload from SD card", navitage to FILE.SOMETHING and click OPEN?!

Once populated, click "Continue"

You can now "Add new wallet"

Select "Single key wallet", you can select Multisignature wallet if you added more than one device and want to make a multisig wallet.

Select the device or devices that you want to use.

Name the wallet and select the key you want to use.

Select "Scan for existing funds" if you have already used this wallet and wish to establish the transaction history, if this is a brand new wallet this is not necessary.

If you select "rescan" you can refresh the page and watch as your bitcoin node rescans the blockchain for your wallet's history.
