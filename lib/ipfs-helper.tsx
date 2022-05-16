import { create, IPFSHTTPClient } from 'ipfs-http-client';

class IPFSHelper {
  private client: IPFSHTTPClient;
  constructor() {
    this.client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: `Basic 29ElP2RjaaS2RaJ7LaRSNqpxBa5:9bb41ed76d3a90efc3484c221dd8c792`,
      },
    });
  }

  public uploadFile = async (fileData: Blob) => {
    if (!this.client)
      throw new Error("IPFS client is undefined. Can't upload file!");
    const result = await this.client.add(fileData, {
      pin: true,
    });
    return result;
  };

  public getFileData = async (cid: string) => {
    if (!this.client)
      throw new Error("IPFS client is undefined. Can't get file data!");
    const chunks = [];
    for await (const chunk of this.client.cat(cid)) {
      chunks.push(chunk);
    }
    const fileData = new Blob(chunks);
    return fileData;
  };

  public parseIPFSURL = (cid: string) => {
    return `ipfs://${cid}`;
  };

  public parseIPFSGatewayURL = (cid: string) => {
    return `https://infura-ipfs.io/ipfs/${cid}`;
  };

  public parseCid = (IPFSURL: string) => {
    return IPFSURL.substring(7);
  };
}

export default IPFSHelper;
