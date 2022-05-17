import { create, IPFSHTTPClient } from 'ipfs-http-client';

class IPFSHelper {
  client: IPFSHTTPClient;

  constructor() {
    const token = btoa(
      `${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}:${process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET}`
    );

    this.client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: `Basic ${token}`,
      },
    });
  }

  public uploadFile = async (fileData: Blob) => {
    const result = await this.client.add(fileData, {
      pin: true,
    });
    return result;
  };

  public getFileData = async (cid: string, type: string) => {
    const chunks = [];
    for await (const chunk of this.client.cat(cid)) {
      chunks.push(chunk);
    }
    const fileData = new Blob(chunks, { type });
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
