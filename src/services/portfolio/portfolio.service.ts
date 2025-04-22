import type { GetPortfolioResponse, PortfolioSchema } from "./portfolio.schema";
import { portfolioRepository } from "./repository/portfolio.repository";

export class PortfolioService {
  async getPortfolio({
    walletAddresses,
  }: PortfolioSchema): Promise<GetPortfolioResponse> {
    return portfolioRepository.tokensByWallet(walletAddresses);
  }
}

export const portfolioService = new PortfolioService();
