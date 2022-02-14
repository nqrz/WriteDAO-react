import sdk from "./1-initialize-sdk.js"

const app = sdk.getAppModule(
  "0xc8c041d00D8D983Ef188e1A26F64F5046488C7a9"
);

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "WriteDAO Governance Token",
      symbol: "PEN",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();