import { ethers } from 'ethers';
import Deemo from '../models/deemo';
import NFTMetadata from '../models/nft-metadata';
import IPFSHelper from './ipfs-helper';

export class DeemoContractHelper {
  private ipfsHelper = new IPFSHelper();
  private readonly GENESIS_BLOCK = 26339725;

  constructor(private contract: ethers.Contract) {}

  public mintNFT = async (name: string, audioFile: File): Promise<string> => {
    const metadataURI = await this.parseMetadataURI(name, audioFile);
    console.log(`NFT metadata stored at: ${metadataURI}`);

    let nftTxn = await this.contract.makeNFT(metadataURI);

    console.log('Minting...please wait.');
    await nftTxn.wait();
    return nftTxn.hash;
  };

  public fetchAllDeemos = async () => {
    const mintEventFilter = this.contract.filters.Transfer(
      ethers.constants.AddressZero
    );
    const mintEvents = await this.contract.queryFilter(
      mintEventFilter,
      this.GENESIS_BLOCK
    );
    const deemos = await Promise.all(
      mintEvents.map<Promise<Deemo>>(async (mintEvent) => {
        const { tokenId } = mintEvent.args!;
        const [owner, tokenURI, block] = await Promise.all([
          this.contract.ownerOf(tokenId),
          this.contract.tokenURI(tokenId),
          mintEvent.getBlock(),
        ]);
        const { name, audioURL } = await this.resolveMetadataURI(tokenURI);
        return {
          tokenId: tokenId.toNumber(),
          title: name,
          owner,
          audioCID: this.ipfsHelper.parseIPFSGatewayURL(
            this.ipfsHelper.parseCid(audioURL)
          ),
          mintedAt: block.timestamp * 1000,
          openSeaURL: `https://testnets.opensea.io/assets/mumbai/0xaf9884b0c98c9dc3f9fd495dd986a78adc61b904/${tokenId}`,
        };
      })
    );
    return deemos;
  };

  private parseMetadataURI = async (name: string, audioFile: File) => {
    const { cid: avatarCid } = await this.ipfsHelper.uploadFile(audioFile);

    const metadata: NFTMetadata = {
      name,
      animation_url: this.ipfsHelper.parseIPFSURL(avatarCid.toString()),
    };

    const metadataJSON = JSON.stringify(metadata);
    const metadataBlob = new Blob([metadataJSON], { type: 'application/json' });
    const { cid: metadataCid } = await this.ipfsHelper.uploadFile(metadataBlob);

    const metadataURI = this.ipfsHelper.parseIPFSURL(metadataCid.toString());
    return metadataURI;
  };

  private resolveMetadataURI = async (
    metadataURI: string
  ): Promise<{ name: string; audioURL: string }> => {
    const metadataBlob = await this.ipfsHelper.getFileData(
      this.ipfsHelper.parseCid(metadataURI)
    );
    const metadataJSON = await metadataBlob.text();
    const metadata: NFTMetadata = JSON.parse(metadataJSON);
    return {
      name: metadata.name,
      audioURL: metadata.animation_url,
    };
  };
}
