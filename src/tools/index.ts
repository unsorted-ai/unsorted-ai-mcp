import type { ToolRegistration } from "@/types";
import { getPortfolioTool } from "@/services/portfolio/tools/get-portfolio";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createTools = (): ToolRegistration<any>[] => {
  return [getPortfolioTool];
};
