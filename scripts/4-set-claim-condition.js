import sdk from "./1-initialize-sdk.js"

const bundleDrop = sdk.getBundleDropModule(
  "0xc8c041d00D8D983Ef188e1A26F64F5046488C7a9",
);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1,
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log("✅ Successfully set claim condition on bundle drop", bundleDrop.address);
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})()
