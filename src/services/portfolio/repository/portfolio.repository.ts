import type { GetPortfolioResponse } from "../portfolio.schema";

if (!process.env.ALCHEMY_API_KEY) {
  throw new Error("ALCHEMY_API_KEY is not set");
}

class PortfolioRepository {
  private options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
  };
  private baseUrl = `https://api.g.alchemy.com/data/v1/${process.env.ALCHEMY_API_KEY}`;

  //   doesnt have a method on the alchemy sdk
  async tokensByWallet(walletAddresses: string[]) {
    const response = await fetch(`${this.baseUrl}/assets/tokens/by-address`, {
      ...this.options,
      body: JSON.stringify({
        addresses: walletAddresses.map((address) => ({
          address,
          networks: ["monad-testnet"],
        })),
        withMetadata: true,
        withPrices: true,
        includeNativeTokens: true,
      }),
    });

    return await response.json();
  }
}

export const portfolioRepository = new PortfolioRepository();
