import type { ToolRegistration } from "@/types";
import { makeJsonSchema } from "@/utils/makeJsonSchema";
import type { PortfolioSchema } from "../../portfolio.schema";
import { getPortfolioSchema } from "../../portfolio.schema";
import { portfolioService } from "../../portfolio.service";

export const getPortfolioTool: ToolRegistration<PortfolioSchema> = {
  name: "get_portfolio",
  description: "Get the portfolio for a list of wallet addresses",
  inputSchema: makeJsonSchema(getPortfolioSchema),
  handler: async (args: PortfolioSchema) => {
    try {
      const parsedArgs = getPortfolioSchema.parse(args);

      const result = await portfolioService.getPortfolio(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  },
};
