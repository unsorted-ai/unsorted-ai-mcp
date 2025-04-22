# Monad MCP Server (`@unsorted-ai/mcp`)

A **Model Context Protocol (MCP)** server for interacting with the Monad blockchain via Alchemy's API.  
It exposes tools (e.g. `get_portfolio`) that LLM‑powered agents (Cursor, Claude) can call directly.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation & Configuration](#installation--configuration)
   - [Cursor](#cursor)
   - [Claude for Desktop](#claude-for-desktop)
3. [Local Development](#local-development)
   - [Environment Variables](#environment-variables)
   - [MCP Configuration (`.cursor/mcp.json`)](#mcp-configuration-cursormcpjson)
   - [Building & Running](#building--running)
4. [Tools Provided](#tools-provided)
5. [Scripts](#scripts)
6. [Contributing](#contributing)
7. [License](#license)

---

## Prerequisites

- Node.js v14+ (or [Bun](https://bun.sh/) v1+)
- npm (or yarn / bun)
- [Cursor](https://docs.cursor.com/context/model-context-protocol#configuring-mcp-servers)
- (Optional) [Claude for Desktop](https://modelcontextprotocol.io/quickstart/user)

---

## Installation & Configuration

### Global Configuration (Recommended)

1. Create or edit `~/.cursor/mcp.json` in your home directory:

   ```jsonc
   {
     "mcpServers": {
       "monad": {
         "command": "npx",
         "args": ["-y", "@unsorted-ai/mcp"],
         "env": {
           "ALCHEMY_API_KEY": "YOUR_ALCHEMY_API_KEY",
         },
       },
     },
   }
   ```

2. Restart or reload your Cursor workspace.
3. In chat, ask something like:

   > Get the portfolio for wallet addresses `0xABC...` and `0xDEF...`

   Cursor will automatically invoke the `get_portfolio` tool.

### Project-Level Configuration

1. Add this package to your project:

   ```bash
   npm install --save @unsorted-ai/mcp
   # or
   bun add @unsorted-ai/mcp
   ```

2. In your project root, create (or open) `.cursor/mcp.json`:

   ```jsonc
   {
     "mcpServers": {
       "monad": {
         "command": "node",
         "args": ["./node_modules/@unsorted-ai/mcp/dist/main.js"],
         "env": {
           "ALCHEMY_API_KEY": "YOUR_ALCHEMY_API_KEY",
         },
       },
     },
   }
   ```

3. Restart or reload your Cursor workspace.
4. In chat, ask something like:

   > Get the portfolio for wallet addresses `0xABC...` and `0xDEF...`

   Cursor will automatically invoke the `get_portfolio` tool.

_For more on Cursor's MCP setup, see "Configuring MCP Servers" in the [Cursor docs](https://docs.cursor.com/context/model-context-protocol#configuring-mcp-servers)._

---

### Claude for Desktop

1. Open **Settings → Developer → Edit Config** in Claude for Desktop.
2. In `claude_desktop_config.json`, add:

   ```jsonc
   {
     "mcpServers": {
       "monad": {
         "command": "npx",
         "args": ["-y", "@unsorted-ai/mcp", "/absolute/path/to/your/project"],
         "env": {
           "ALCHEMY_API_KEY": "YOUR_ALCHEMY_API_KEY",
         },
       },
     },
   }
   ```

3. Restart Claude. Click the 🔨 icon to see and run your tools.

_For a step‑by‑step Claude guide, see the [MCP quickstart for Claude Desktop users](https://modelcontextprotocol.io/quickstart/user)._

---

## Local Development

### Environment Variables

Copy and configure your Alchemy key:

```bash
cp .env.example .env
```

Edit `.env`:

```dotenv
ALCHEMY_API_KEY=your-alchemy-api-key-here
```

### MCP Configuration (`.cursor/mcp.json`)

For local testing (pointing at your `start:dev` script):

```jsonc
{
  "mcpServers": {
    "monad": {
      "command": "npm",
      "args": ["run", "start:dev"],
      "cwd": ".",
    },
  },
}
```

### Building & Running

Install deps and build:

```bash
npm install
npm run build
```

Start in dev mode (auto‑rebuild & run):

```bash
npm run start:dev
```

Or run the compiled server directly:

```bash
node dist/main.js
```

---

## Tools Provided

- **get_portfolio**

  - **Description**: Fetch on‑chain token balances for up to 2 wallet addresses.
  - **Input schema**:

    ```json
    {
      "walletAddresses": ["0x123...", "0x456..."]
    }
    ```

---

## Scripts

| Command             | Description                                         |
| ------------------- | --------------------------------------------------- |
| `npm run build`     | Compile `src/main.ts` → `dist/main.js`              |
| `npm run start:dev` | Start server in watch mode (via Bun / Node)         |
| `npm start`         | Run the built server                                |
| `npm test`          | Run tests                                           |
| `npm run lint`      | Lint source via Biome                               |
| `npm run format`    | Format source via Biome                             |
| `npm run release`   | Bump version, generate CHANGELOG & update `VERSION` |

---

## Contributing

1. Fork this repo
2. `git checkout -b feature/foo`
3. Make changes & `git commit -m "Add foo"`
4. `git push origin feature/foo`
5. Open a pull request

---

## License

MIT © Unsorted AI
