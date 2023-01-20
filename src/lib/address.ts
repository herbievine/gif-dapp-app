const displayAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export { displayAddress };