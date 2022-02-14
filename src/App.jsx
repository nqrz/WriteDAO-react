import { useEffect, useMemo, useState } from 'react';

import { useWeb3 } from '@3rdweb/hooks';
import { ThirdwebSDK } from '@3rdweb/sdk';

const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule(
  "0xc8c041d00D8D983Ef188e1A26F64F5046488C7a9"
);

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address)

  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);
  

  useEffect(() => {
    if (!address) {
      return;
    }

    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!")
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("Failed to nft balance", error);
      });
  }, [address]);

  if (!address) {
    return (
      <div className='banner'>
        <div className='card center'>
          <h1>WriteDAO</h1>
          <h6>A place for Authors and loyal Reader</h6>
          <button onClick={() => connectWallet("injected")} className='btn mb-12'>
            Connect your wallet
          </button>
        </div>
      </div>
    )
  }

  if (hasClaimedNFT) {
    return (
      <div className='banner'>
        <div className='card center'>
          <h1>WriteDAO</h1>
          <h6>Congrats! You are member now.</h6>
        </div>
      </div>
    )
  }

  const mintNft = () => {
    setIsClaiming(true);
    bundleDropModule
      .claim("0", 1)
      .then(() => {
        setHasClaimedNFT(true);
        console.log(
          `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address.toLowerCase()}/0`
        );
      })
      .catch((err) => {
        console.log("Failed to claim", err);
      })
      .finally(() => {
        setIsClaiming(false)
      });
  }
  
  return (
    <div className='banner'>
      <div className='card center'>
        <h1>WriteDAO</h1>
        <h5>Mint your free 📖 Book of wisdom NFT</h5>
        <button
          disabled={isClaiming}
          onClick={() => mintNft()}
          className="btn mb-12"
        >
          {isClaiming ? "Minting..." : "Mint your NFT"}
        </button>
      </div>
    </div>
  )
}

export default App
