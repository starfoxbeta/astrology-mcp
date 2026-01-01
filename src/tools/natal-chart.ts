import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { callAstrologyAPI, type NatalChartResult } from "../api-client.js";

/**
 * Register the calculate_natal_chart tool
 */
export function registerNatalChartTool(server: McpServer): void {
  server.tool(
    "calculate_natal_chart",
    "Calculate a complete natal/birth chart with planetary positions, houses, and aspects. Provide the birth date, time, and location to get an accurate astrological chart.",
    {
      datetime: z
        .string()
        .describe(
          "Birth date and time in ISO 8601 format (e.g., '1990-05-15T14:30:00')",
        ),
      latitude: z
        .number()
        .min(-90)
        .max(90)
        .describe("Birth location latitude (e.g., 40.7128 for New York)"),
      longitude: z
        .number()
        .min(-180)
        .max(180)
        .describe("Birth location longitude (e.g., -74.0060 for New York)"),
      timezone: z
        .string()
        .optional()
        .describe(
          "Timezone identifier (e.g., 'America/New_York'). Auto-detected if not provided.",
        ),
      house_system: z
        .enum(["placidus", "whole_sign", "koch", "equal"])
        .default("placidus")
        .describe(
          "House system to use. Placidus is most common in Western astrology.",
        ),
    },
    async ({ datetime, latitude, longitude, timezone, house_system }) => {
      try {
        const result = await callAstrologyAPI<NatalChartResult>(
          "/v1/natal-chart",
          {
            datetime,
            latitude,
            longitude,
            timezone,
            house_system,
          },
        );

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error occurred";
        console.error("[calculate_natal_chart error]", error);

        return {
          content: [
            {
              type: "text" as const,
              text: `Error calculating natal chart: ${message}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
