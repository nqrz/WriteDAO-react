import { ethers } from "ethers";
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const app = sdk.getAppModule("0xf4d451fF16AA141DD64cff5d5b9642Dd0CEfe565");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "WriteDAO Membership",
      description: "A place for Authors and loyal Readers",
      image: readFileSync("scripts/assets/bookmark.png"),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("Failes to deploy bundleDrop module", error);
  }
})()
