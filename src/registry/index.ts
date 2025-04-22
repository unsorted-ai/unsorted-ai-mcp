import type { ToolRegistration } from "@/types";
import { getPortfolioTool } from "@/tools/portfolio/portfolio.tool";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createTools = (): ToolRegistration<any>[] => {
  return [getPortfolioTool];
};
