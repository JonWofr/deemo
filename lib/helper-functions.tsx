export const abbreviateHash = (hash: string) => {
  return `${hash.substring(0, 4)}...${hash.substring(
    hash.length - 4,
    hash.length
  )}`;
};
