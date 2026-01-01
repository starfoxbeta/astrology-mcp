# astrology-mcp

The definitive MCP server for astrology — accurate charts, ephemeris calculations, and connections to professional human astrologers when AI reaches its limits.

## Installation

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "astrology": {
      "command": "npx",
      "args": ["-y", "astrology-mcp"]
    }
  }
}
```

### With API Backend (Optional)

To connect to a real astrology calculation backend:

```json
{
  "mcpServers": {
    "astrology": {
      "command": "npx",
      "args": ["-y", "astrology-mcp"],
      "env": {
        "ASTROLOGY_API_URL": "https://your-api.com",
        "ASTROLOGY_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Available Tools

### `calculate_natal_chart`

Calculate a complete natal/birth chart with planetary positions, houses, and aspects.

**Parameters:**
- `datetime` (required): Birth date and time in ISO 8601 format (e.g., `1990-05-15T14:30:00`)
- `latitude` (required): Birth location latitude (e.g., `40.7128` for New York)
- `longitude` (required): Birth location longitude (e.g., `-74.0060` for New York)
- `timezone` (optional): Timezone identifier (e.g., `America/New_York`)
- `house_system` (optional): House system to use. Options: `placidus` (default), `whole_sign`, `koch`, `equal`

**Returns:**
- Planetary positions (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto)
- House cusps for all 12 houses
- Angles (Ascendant, Midheaven)
- Aspects between planets with orbs

## Example Usage

Ask Claude:
> "Calculate my natal chart. I was born on May 15, 1990 at 2:30 PM in New York City."

## Supported Features

- Western tropical astrology
- Multiple house systems (Placidus, Whole Sign, Koch, Equal)
- All major planets including outer planets
- Major aspects (conjunction, opposition, trine, square, sextile)
- Accurate planetary positions

## Coming Soon

- Current transits
- Synastry (relationship compatibility)
- Solar returns
- Professional astrologer connections

## License

MIT
