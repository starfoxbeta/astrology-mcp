#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerNatalChartTool } from "./tools/natal-chart.js";

const server = new McpServer({
  name: "astrology-mcp",
  version: "0.1.0",
});

// Register tools
registerNatalChartTool(server);

// Handle process errors
process.on("uncaughtException", (error) => {
  console.error("[astrology-mcp] Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[astrology-mcp] Unhandled rejection:", reason);
});

// Connect via stdio
console.error("[astrology-mcp] Starting server...");
const transport = new StdioServerTransport();
await server.connect(transport);
