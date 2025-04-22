import type {
  CallToolResult,
  Tool,
  ToolSchema,
} from "@modelcontextprotocol/sdk/types.js";
import type { z } from "zod";

export type ToolInput = z.infer<typeof ToolSchema.shape.inputSchema>;

export type ToolRegistration<T> = Tool & {
  handler: (args: T) => CallToolResult | Promise<CallToolResult>;
};
