const elrondConfigs: { [key: string]: any } = {
  test: {
    id: 'testnet',
    name: 'Testnet',
    egldLabel: 'xEGLD',
    walletAddress: 'https://testnet-wallet.elrond.com/dapp/init',
    apiAddress: 'https://testnet-api.elrond.com',
    gatewayAddress: 'https://testnet-gateway.elrond.com',
    explorerAddress: 'http://testnet-explorer.elrond.com/'
  },
  dev: {
    id: 'devnet',
    name: 'Devnet',
    egldLabel: 'xEGLD',
    walletAddress: 'https://devnet-wallet.elrond.com',
    apiAddress: 'https://devnet-api.elrond.com',
    gatewayAddress: 'https://devnet-gateway.elrond.com',
    explorerAddress: 'http://devnet-explorer.elrond.com/'
  },
  main: {
    id: 'mainnet',
    name: 'Mainnet',
    egldLabel: 'EGLD',
    walletAddress: 'https://wallet.elrond.com',
    apiAddress: 'https://api.elrond.com',
    gatewayAddress: 'https://gateway.elrond.com',
    explorerAddress: 'http://explorer.elrond.com/'
  }
};

export default elrondConfigs;
