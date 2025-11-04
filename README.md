# ChittyTracker

**Universal infrastructure and project management CLI for the ChittyOS ecosystem**

ChittyTracker is a unified command-line tool that helps you manage every aspect of your development workflow:

- 📋 **Project Tracking** - Sync between Notion databases and GitHub Projects
- ☁️ **Cloud Infrastructure** - Manage Cloudflare Workers, DNS, KV, R2, Durable Objects
- 🗄️ **Database Management** - Neon PostgreSQL schemas, migrations, and deployments
- 🤖 **AI Tools** - Configure MCP servers and Claude Code settings
- 📁 **File Management** - Organize Google Drive and rclone remotes
- ⏱️ **Smart Nudges** - Shell hooks remind you to update trackers after git commits
- 🔄 **Two-Way Sync** - Keep Notion Actions and GitHub Issues in perfect sync

## Quick Start

```bash
# Install globally
npm install -g chittytracker

# Or run directly
npx chittytracker

# Initialize with interactive config
chitty config
```

## Core Features

### 1. Project Tracking

Interactive `rclone`-style config for managing "remotes" (Notion databases, GitHub projects):

```bash
# Open interactive config menu
chitty config

# Add a Notion database remote
# Choose: New remote → Notion database
# Enter your database URL: https://notion.so/DATABASE_ID?v=VIEW_ID

# Add a GitHub project remote
# Choose: New remote → GitHub project

# List all remotes
chitty remote list

# Open a remote
chitty open tracker
chitty open tracker actions  # Open specific view
```

### 2. Smart Shell Hooks

Get reminded to update your tracker after important commands:

```bash
# Install zsh hooks
chitty hook install zsh

# Now you'll get nudges after:
# - git commit
# - git merge
# - wrangler deploy
# - npm publish

# Manual checkpoint
ai_checkpoint "Finished OAuth implementation"

# Press Ctrl-G to open tracker anytime
```

### 3. Two-Way Notion ↔ GitHub Sync

Keep your Notion Actions and GitHub Issues in perfect sync:

```bash
# Setup sync (interactive)
chitty sync setup

# Preview changes without applying
chitty sync run --dry-run

# Run sync
chitty sync run

# Check sync status
chitty sync status
```

**Mapping:**
- Notion Status "To Do" ↔ GitHub open + label:todo
- Notion Status "In Progress" ↔ GitHub open + label:in-progress
- Notion Status "Done" ↔ GitHub closed + label:done
- Notion Status "Archived" ↔ GitHub closed + label:archived

**Conflict Resolution:**
- Automatically detects when both Notion and GitHub changed
- Sets Sync State to "conflict" in Notion
- Manual resolution required

### 4. Cloud Infrastructure Management (Coming Soon)

```bash
# Cloudflare Workers
chitty cf worker list
chitty cf worker deploy chittyauth --env production
chitty cf worker tail chittyconnect
chitty cf worker secrets set chittyauth JWT_SECRET

# DNS
chitty cf dns list chitty.cc
chitty cf dns add chitty.cc A new-service 1.2.3.4

# KV / R2
chitty cf kv list --namespace CACHE
chitty cf r2 list --bucket documents
```

### 5. Database Management (Coming Soon)

```bash
# List databases
chitty neon db list

# Run migrations
chitty neon migrate up
chitty neon migrate down

# Schema diff
chitty neon schema diff production staging

# Quick query
chitty neon query "SELECT * FROM identities LIMIT 5"
```

### 6. MCP & AI Configuration (Coming Soon)

```bash
# List installed MCP servers
chitty mcp list

# Install a new MCP server
chitty mcp install @modelcontextprotocol/server-filesystem

# Configure Claude Code
chitty claude config
chitty claude remote add my-api https://api.example.com
```

### 7. Storage & Sync (Coming Soon)

```bash
# rclone integration
chitty rclone remote add gdrive
chitty rclone sync local:./docs gdrive:/ChittyOS/docs

# Google Drive organization
chitty gdrive tree
chitty gdrive mkdir "ChittyOS/Projects"
```

## Installation

### Global Installation

```bash
npm install -g chittytracker
```

### Local Development

```bash
git clone https://github.com/YOUR_USERNAME/chittytracker
cd chittytracker
npm install
npm run build
npm link
```

## Configuration

All config is stored in `~/.config/chitty/config.json`:

```json
{
  "remotes": {
    "tracker": {
      "type": "notion-database",
      "url": "https://notion.so/DATABASE_ID?v=VIEW_ID",
      "databaseId": "DATABASE_ID",
      "views": {
        "actions": "https://notion.so/DATABASE_ID?v=VIEW_ID",
        "projects": "https://notion.so/DATABASE_ID?v=VIEW_ID"
      }
    },
    "chittyos": {
      "type": "github-project",
      "owner": "YOUR_USERNAME",
      "repo": "chittyos",
      "projectNumber": 1
    }
  },
  "nudges": {
    "enabled": true,
    "intervalMinutes": 45
  },
  "sync": {
    "enabled": true,
    "notionToken": "secret_...",
    "githubToken": "ghp_...",
    "mappings": [
      {
        "notionRemote": "tracker",
        "githubRemote": "chittyos"
      }
    ]
  }
}
```

## Command Reference

### General

```bash
chitty config                    # Interactive config menu
chitty remote list               # List all remotes
chitty open <name> [view]        # Open remote in browser
```

### Tracking & Nudges

```bash
chitty nudge now                 # Interactive nudge
chitty nudge quiet               # Quick reminder
chitty checkpoint [message]      # Save checkpoint
chitty checkpoints [limit]       # List recent checkpoints
```

### Shell Hooks

```bash
chitty hook install zsh          # Install zsh hooks
chitty hook uninstall zsh        # Uninstall zsh hooks
```

### Sync

```bash
chitty sync setup                # Configure sync
chitty sync run [--dry-run]      # Run sync
chitty sync status               # Show sync config
```

## Setup Guides

- **[GitHub App Setup](./GITHUB_APP.md)** - Create GitHub App for webhooks and API access
- **[Notion Integration](./GITHUB_APP.md#notion-integration-setup)** - Connect Notion databases
- **[Two-Way Sync](./GITHUB_APP.md#testing-the-setup)** - Configure bidirectional sync

## Architecture

### CLI Structure

```
chittytracker/
├── src/
│   ├── commands/          # Command implementations
│   │   ├── config.ts      # Interactive rclone-style config
│   │   ├── open.ts        # Open remotes
│   │   ├── nudge.ts       # Nudges and reminders
│   │   ├── checkpoint.ts  # Checkpoint logging
│   │   ├── hook.ts        # Shell hook management
│   │   └── sync.ts        # Two-way sync
│   ├── lib/               # Core libraries
│   │   ├── config.ts      # Config management
│   │   ├── notion.ts      # Notion API client
│   │   ├── github.ts      # GitHub API client
│   │   └── sync.ts        # Sync worker
│   ├── types/             # TypeScript types
│   └── zsh/               # Shell snippets
│       └── snippets.zsh   # Zsh hooks
├── bin/
│   └── chitty.js          # CLI entry point
└── tests/                 # Test suite
```

### Future: Web Interface

Coming soon - web dashboard for:
- Visual project status
- Sync history and conflicts
- Infrastructure monitoring
- AI usage analytics

### Future: MCP Server

Expose ChittyTracker via Model Context Protocol:

```json
{
  "mcpServers": {
    "chitty": {
      "command": "chitty",
      "args": ["mcp"]
    }
  }
}
```

## Development Roadmap

### Phase 1: Core Tracking ✅
- [x] Interactive config (rclone-style)
- [x] Notion remote management
- [x] GitHub remote management
- [x] Shell hooks (zsh)
- [x] Nudges and checkpoints
- [x] Two-way sync engine

### Phase 2: Cloud Infrastructure 🚧
- [ ] Cloudflare Workers management
- [ ] DNS configuration
- [ ] KV/R2 operations
- [ ] Neon database management
- [ ] Schema migrations

### Phase 3: AI & Storage 📋
- [ ] MCP server management
- [ ] Claude Code configuration
- [ ] rclone integration
- [ ] Google Drive organization

### Phase 4: Web & MCP 📋
- [ ] Web dashboard
- [ ] MCP server implementation
- [ ] Real-time webhook handler
- [ ] Analytics and reporting

## Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a PR

## License

MIT

## Related Projects

- **[ChittyOS](https://github.com/YOUR_USERNAME/chittyos)** - Legal technology platform
- **[ChittyID](https://id.chitty.cc)** - Identity service
- **[ChittyConnect](https://connect.chitty.cc)** - AI-intelligent integration spine

---

Built with ❤️ for the ChittyOS ecosystem
