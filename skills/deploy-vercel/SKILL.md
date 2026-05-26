---
name: deploy-vercel
description: Use when deploying to Vercel or getting a preview URL.
disable-model-invocation: true
---

# deploy-vercel

Deploys the Astro site to Vercel and returns a preview URL.

## Flow

### 1. Check Vercel MCP Configuration

Check if the Vercel MCP server is available. If not configured, provide setup steps:

**Install:**
```bash
npm install -g @vercel/mcp-adapter
```

**Add to `~/.claude/mcp.json`:**
```json
{
  "mcpServers": {
    "vercel": {
      "command": "vercel-mcp",
      "env": {
        "VERCEL_API_TOKEN": "your_token_here"
      }
    }
  }
}
```

Get your token from: vercel.com/account/tokens

### 2. Pre-Deploy Check

Before deploying, verify:
- `npm run build` passes locally
- `astro.config.mjs` has correct `site` URL
- No `.env` files with secrets are committed

### 3. Deploy

Use the Vercel MCP deploy tool to trigger deployment. For static Astro sites, no adapter is needed — `output: 'static'` is the default.

### 4. Return Results

```
✓ Deployed to Vercel

Preview URL: https://your-project-xxxxx.vercel.app
Production:  https://your-domain.com (if custom domain configured)

Build logs: [link]
```

### 5. Surface Build Errors

If the Vercel build fails, fetch build logs from the Vercel MCP and surface the error messages. Fix locally, then redeploy.

## Static Output Confirmation

This plugin assumes `output: 'static'` in `astro.config.mjs`. No `@astrojs/vercel` adapter is needed for static sites. If the project uses `output: 'server'` or `output: 'hybrid'`, instruct the user to install `@astrojs/vercel` before deploying.
