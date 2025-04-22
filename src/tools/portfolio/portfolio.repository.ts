import { formatUnits } from "viem";
import type { AlchemyResponse } from "./portfolio.schema";

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
  async tokensByWallet(walletAddresses: string[]): Promise<AlchemyResponse> {
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

    const result = (await response.json()) as AlchemyResponse;

    const tokens = result.data.tokens.map((token) => {
      // initialize the token value as not available
      let tokenValueUsd = "Not available";

      // format the token balance to a readable number
      const tokenBalance = formatUnits(
        BigInt(token.tokenBalance),
        token.tokenMetadata?.decimals || 18
      );

      // get the usd price of the token
      const usdPrice = token.tokenPrices?.find(
        (price) => price.currency === "usd"
      )?.value;

      // if the usd price and token balance is available, calculate the token value in usd
      if (usdPrice && Number(tokenBalance) > 0) {
        // explicitly format the token as USD so LLMs can understand it
        tokenValueUsd = `${Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(usdPrice) * Number(tokenBalance))} USD`;
      }

      // return the token with the token value in usd and the token balance
      return {
        ...token,
        tokenValueUsd,
        tokenBalance: tokenBalance,
      };
    });

    return {
      ...result,
      data: {
        ...result.data,
        tokens,
      },
    };
  }
}

export const portfolioRepository = new PortfolioRepository();
