import type { AlchemyResponse, PortfolioSchema } from "./portfolio.schema";
import { portfolioRepository } from "./portfolio.repository";

export class PortfolioService {
  async getPortfolio({
    walletAddresses,
  }: PortfolioSchema): Promise<AlchemyResponse> {
    return portfolioRepository.tokensByWallet(walletAddresses);
  }
}

export const portfolioService = new PortfolioService();
