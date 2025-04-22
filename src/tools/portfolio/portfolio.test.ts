import { describe, expect, it } from "bun:test";
import { getPortfolioTool } from "./portfolio.tool";
import {
  getPortfolioResponseSchema,
  alchemyResponseSchema,
} from "./portfolio.schema";

describe("getPortfolioTool", () => {
  it("should return expected output", async () => {
    const result = await getPortfolioTool.handler({
      walletAddresses: ["0x87930A5D05357280914f56Ef28b077Fe1325cd16"],
    });

    // Validate the MCP tool response format
    const parsedResult = getPortfolioResponseSchema.parse(result);
    expect(parsedResult.content).toHaveLength(1);
    expect(parsedResult.content[0].type).toBe("text");

    // Parse and validate the Alchemy data inside the text field
    const alchemyData = JSON.parse(parsedResult.content[0].text);
    const parsedAlchemyData = alchemyResponseSchema.parse(alchemyData);
    console.log(JSON.stringify(parsedAlchemyData, null, 2));
    expect(parsedAlchemyData.data.tokens).toBeInstanceOf(Array);
  });

  it("should handle errors", async () => {
    // Use a properly typed empty object
    const result = await getPortfolioTool.handler({
      walletAddresses: undefined as unknown as string[],
    });

    const parsedResult = getPortfolioResponseSchema.parse(result);
    expect(parsedResult.isError).toBe(true);
    expect(parsedResult.content[0].text).toContain("Required");
  });
});
