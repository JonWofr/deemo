import Deemo from '../models/deemo';
import NFTMetadata from '../models/nft-metadata';
import IPFSHelper from './ipfs-helper';

class DeemoContractHelper {
  private ipfsHelper = new IPFSHelper();
  constructor() {}

  //   public mintNFT = async (name: string, file: File): Promise<void> => {
  //     const metadataURI = await this.parseMetadataURI(name, file);
  //     console.log(`NFT metadata stored at: ${metadataURI}`);

  //     let nftTxn = await this.contract.makeNFT(metadataURI);

  //     console.log('Minting...please wait.');
  //     const txnReceipt = await nftTxn.wait();

  //     console.log(
  //       `Minted, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
  //     );
  //   };

  private parseMetadataURI = async (name: string, file: File) => {
    const { cid } = await this.ipfsHelper.uploadFile(file);

    const metadata: NFTMetadata = {
      name,
      animation_url: this.ipfsHelper.parseIPFSURL(cid.toString()),
    };

    const metadataJSON = JSON.stringify(metadata);
    const metadataBlob = new Blob([metadataJSON], { type: 'application/json' });
    const { cid: metadataCid } = await this.ipfsHelper.uploadFile(metadataBlob);

    const metadataURI = this.ipfsHelper.parseIPFSURL(metadataCid.toString());
    return metadataURI;
  };

  //   public fetchAllArtimons = async () => {
  //     const mintEventFilter = this.contract.filters.Transfer(
  //       ethers.constants.AddressZero
  //     );
  //     const mintEvents = await this.contract.queryFilter(mintEventFilter);
  //     const artimons = await Promise.all(
  //       mintEvents.map<Promise<Artimon>>(async (mintEvent) => {
  //         const { tokenId } = mintEvent.args!;
  //         const [owner, tokenURI] = await Promise.all([
  //           this.contract.ownerOf(tokenId),
  //           this.contract.tokenURI(tokenId),
  //         ]);
  //         const artimon = await this.parseArtimon(tokenURI);
  //         return {
  //           ...artimon,
  //           trainer: owner,
  //           tokenId: tokenId.toNumber(),
  //         };
  //       })
  //     );
  //     return artimons;
  //   };

  private parseDeemo = async (metadataURI: string): Promise<Deemo> => {
    const metadataBlob = await this.ipfsHelper.getFileData(
      this.ipfsHelper.parseCid(metadataURI)
    );
    const metadataJSON = await metadataBlob.text();
    const metadata: NFTMetadata = JSON.parse(metadataJSON);
    return {
      tokenId: '',
      title: metadata.name,
      audioCID: this.ipfsHelper.parseIPFSGatewayURL(
        this.ipfsHelper.parseCid(metadata.animation_url)
      ),
      mintedAt: 0,
      openSeaURL: '',
      owner: '',
    };
  };
}

export default DeemoContractHelper;
