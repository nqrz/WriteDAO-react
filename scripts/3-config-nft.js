import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xc8c041d00D8D983Ef188e1A26F64F5046488C7a9"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Book of wisdom",
        description: "This NFT will give you access to WriteDAO",
        image: readFileSync("scripts/assets/bookmark.png"),
      }
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("Failed to create the new NFT", error);
  }
})()