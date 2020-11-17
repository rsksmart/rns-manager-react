class Web3ProviderClass {
  constructor(provider = null) {
    if (Web3ProviderClass.instance) {
      return Web3ProviderClass.instance;
    }

    Web3ProviderClass.instance = this;
    this.provider = provider;
    return this.provider;
  }

  setProvider(provider) {
    this.provider = provider;
  }

  getProvider() {
    return this.provider;
  }
}

export default Web3ProviderClass;
