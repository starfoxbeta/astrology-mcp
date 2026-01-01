/**
 * API client for the astrology backend.
 * Currently returns mock data - replace with real API calls when backend is ready.
 */

const API_BASE =
  process.env.ASTROLOGY_API_URL || "https://api.astrology-mcp.com";
const API_KEY = process.env.ASTROLOGY_API_KEY;

// Set to true to use mock responses (no backend required)
const USE_MOCK = !API_KEY || API_BASE === "https://api.astrology-mcp.com";

export interface NatalChartParams {
  datetime: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  house_system: "placidus" | "whole_sign" | "koch" | "equal";
}

export interface NatalChartResult {
  planets: Record<
    string,
    { sign: string; degree: number; retrograde: boolean }
  >;
  houses: Record<string, { sign: string; degree: number }>;
  angles: {
    ascendant: { sign: string; degree: number };
    midheaven: { sign: string; degree: number };
  };
  aspects: Array<{
    planet1: string;
    planet2: string;
    aspect: string;
    orb: number;
  }>;
}

/**
 * Call the astrology API endpoint
 */
export async function callAstrologyAPI<T>(
  endpoint: string,
  data: unknown,
): Promise<T> {
  if (USE_MOCK) {
    console.error("[astrology-mcp] Using mock data (no API key configured)");
    return getMockResponse(endpoint, data) as T;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Generate mock responses for development/testing
 */
function getMockResponse(endpoint: string, data: unknown): unknown {
  if (endpoint === "/v1/natal-chart") {
    const params = data as NatalChartParams;
    return generateMockNatalChart(params);
  }

  return { error: "Unknown endpoint", endpoint };
}

function generateMockNatalChart(params: NatalChartParams): NatalChartResult {
  // This is placeholder mock data
  // Real implementation would calculate actual planetary positions
  return {
    planets: {
      sun: { sign: "Aries", degree: 15.5, retrograde: false },
      moon: { sign: "Cancer", degree: 22.3, retrograde: false },
      mercury: { sign: "Pisces", degree: 28.1, retrograde: true },
      venus: { sign: "Taurus", degree: 8.7, retrograde: false },
      mars: { sign: "Gemini", degree: 12.4, retrograde: false },
      jupiter: { sign: "Sagittarius", degree: 5.2, retrograde: false },
      saturn: { sign: "Capricorn", degree: 18.9, retrograde: false },
      uranus: { sign: "Aquarius", degree: 3.6, retrograde: false },
      neptune: { sign: "Pisces", degree: 21.8, retrograde: false },
      pluto: { sign: "Capricorn", degree: 25.4, retrograde: false },
    },
    houses: {
      "1": { sign: "Leo", degree: 10.0 },
      "2": { sign: "Virgo", degree: 5.0 },
      "3": { sign: "Libra", degree: 2.0 },
      "4": { sign: "Scorpio", degree: 3.0 },
      "5": { sign: "Sagittarius", degree: 7.0 },
      "6": { sign: "Capricorn", degree: 12.0 },
      "7": { sign: "Aquarius", degree: 10.0 },
      "8": { sign: "Pisces", degree: 5.0 },
      "9": { sign: "Aries", degree: 2.0 },
      "10": { sign: "Taurus", degree: 3.0 },
      "11": { sign: "Gemini", degree: 7.0 },
      "12": { sign: "Cancer", degree: 12.0 },
    },
    angles: {
      ascendant: { sign: "Leo", degree: 10.0 },
      midheaven: { sign: "Taurus", degree: 3.0 },
    },
    aspects: [
      { planet1: "sun", planet2: "moon", aspect: "square", orb: 6.8 },
      { planet1: "sun", planet2: "jupiter", aspect: "trine", orb: 1.7 },
      { planet1: "moon", planet2: "venus", aspect: "sextile", orb: 3.4 },
      { planet1: "mars", planet2: "saturn", aspect: "opposition", orb: 5.5 },
      { planet1: "venus", planet2: "neptune", aspect: "conjunction", orb: 2.1 },
    ],
    _meta: {
      generated_at: new Date().toISOString(),
      input: params,
      house_system: params.house_system,
      note: "This is mock data. Configure ASTROLOGY_API_URL and ASTROLOGY_API_KEY for real calculations.",
    },
  } as NatalChartResult;
}
