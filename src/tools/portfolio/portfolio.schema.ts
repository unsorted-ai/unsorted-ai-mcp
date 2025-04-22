import { z } from "zod";

export const getPortfolioSchema = z.object({
  walletAddresses: z
    .array(z.string().describe("The wallet addresses"))
    .max(2, "Limit 2 wallet addresses")
    .describe(
      "The array of wallet addresses to get the portfolio for. Limit 2"
    ),
});

export type PortfolioSchema = z.infer<typeof getPortfolioSchema>;

// Schema for the actual Alchemy API response
export const alchemyResponseSchema = z.object({
  data: z.object({
    tokens: z.array(
      z.object({
        address: z.string(),
        network: z.string(),
        tokenAddress: z.string().nullable(),
        tokenBalance: z.string(),
        tokenValueUsd: z.string(),
        tokenMetadata: z
          .object({
            symbol: z.string(),
            decimals: z.number(),
            name: z.string(),
            logo: z.string().nullable(),
          })
          .optional()
          .nullable(),
        tokenPrices: z
          .array(
            z.object({
              currency: z.string(),
              value: z.string(),
              lastUpdatedAt: z.string(),
            })
          )
          .default([]), // Default to empty array when not present
      })
    ),
  }),
});

export type AlchemyResponse = z.infer<typeof alchemyResponseSchema>;
// Schema for the MCP tool response format
export const getPortfolioResponseSchema = z.object({
  content: z.array(
    z.object({
      type: z.literal("text"),
      text: z.string(),
    })
  ),
  isError: z.boolean().optional(),
});

export type GetPortfolioResponse = z.infer<typeof getPortfolioResponseSchema>;
