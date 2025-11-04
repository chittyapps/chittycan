# Changelog

All notable changes to ChittyCan will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2024-11-04

### Changed - 🎉 REBRAND: ChittyTracker → ChittyCan

**Breaking Changes**
- 🔄 Package renamed from `chittytracker` → `chittycan`
- 🔄 Primary binary renamed from `chitty` → `can` (chitty remains as alias)
- 🔄 Repository URLs updated to reflect new name

**Philosophy**
- ✨ "Can you...?" → "Yes you can!" - More active, empowering branding
- ✨ Completely autonomous network for platform navigation
- ✨ C.A.N. easter egg: Chitty Autonomous Navigator / Completely Autonomous Network
- ✨ Updated all documentation with new ChittyCan identity
- ✨ Installation message now suggests `can config` instead of `chitty config`

### Added - ChittyOS Services Integration

**New Extensions**
- ✨ `chittyconnect` - MCP server management, integrations, GitHub App, OpenAPI, proxies
- ✨ `chittyregistry` - Tool/script registry, service discovery, analytics
- ✨ `chittyrouter` - AI email gateway, multi-agent orchestration (Triage, Priority, Response, Document)

**Commands Added**
```bash
# ChittyConnect
can connect mcp start/stop/status/tools
can connect integrations list/add/test
can connect github webhooks/sync
can connect openapi export
can connect proxy notion/openai/gcal

# ChittyRegistry
can registry tools list/register/search
can registry services list/register/discover
can registry service health
can registry scripts list/execute

# ChittyRouter
can router inbox list/process/stats
can router agents list/invoke/history
can router rules list/create/test
can router models test/fallback-chain
can router analytics routing/agents
```

**Architecture**
- 🏗️ Unified ChittyOS plugin namespace
- 🏗️ All 5 ChittyOS core services integrated (ID, Auth, Connect, Registry, Router)
- 🏗️ Enhanced plugin system with subcommands support
- 🏗️ Remote type definitions with configFields

**Migration Guide**
```bash
# Uninstall old package
npm uninstall -g chittytracker

# Install new package
npm install -g chittycan

# Use new primary command
can config

# Or use familiar alias
chitty config
```

## [0.2.0] - 2024-11-04

### Added - Phase 2: Plugin System & Extensions

**Plugin System**
- ✨ Dynamic plugin loading architecture
- ✨ Plugin lifecycle management (init/enable/disable)
- ✨ Command and remote type registration
- ✨ `can ext list/install/enable/disable` commands

**Extensions**
- ✨ `@chitty/cloudflare` - Workers, KV, R2, DNS management
- ✨ `@chitty/neon` - PostgreSQL databases, branches, migrations
- ✨ `@chitty/linear` - Issue tracking and GraphQL API

**Developer Experience**
- ✨ `can doctor` - Environment validation and health checks
- ✨ MCP server skeleton for AI integration
- ✨ GitHub Actions CI/CD workflows
- ✨ Cross-platform smoke tests (macOS, Linux, Windows)

**Package**
- ✨ MIT License
- ✨ npm publish automation with provenance
- ✨ Proper bin pointing to built dist/
- ✨ Enhanced keywords and metadata

### Changed
- 📦 Version bumped to 0.2.0
- 📦 Binary now points to `dist/index.js` (built TypeScript)
- 📚 Updated README with extension documentation

### Fixed
- 🐛 TypeScript strict type checks for plugin system
- 🐛 Config type definitions for extensions

## [0.1.0] - 2024-11-03

### Added - Phase 1: Core Platform

**Core Features**
- ✨ Interactive rclone-style config menu
- ✨ Notion database remote type
- ✨ GitHub Projects remote type
- ✨ Two-way sync engine with conflict detection
- ✨ Smart nudges with project selection
- ✨ Shell hooks (zsh) with Ctrl-G hotkey
- ✨ Checkpoint logging system

**Commands**
- `can config` (or `chitty config`) - Interactive configuration
- `can open <name> [view]` - Open remotes
- `can nudge now` - Interactive nudge
- `can checkpoint [msg]` - Log milestones
- `can sync setup/run/status` - Two-way sync
- `can hook install/uninstall zsh` - Shell integration

**Documentation**
- 📚 README.md - Complete feature overview
- 📚 QUICKSTART.md - 5-minute setup guide
- 📚 GITHUB_APP.md - Integration setup
- 📚 EXTENSIONS.md - 80+ planned integrations
- 📚 VISION.md - Product roadmap
- 📚 OS_SUPPORT.md - Cross-platform guide

### Technical
- 🏗️ TypeScript/Node.js 18+ architecture
- 🏗️ Drizzle ORM integration
- 🏗️ Cloudflare Workers compatibility
- 🏗️ Plugin-ready architecture

---

## Upcoming

### [0.3.0] - Phase 3: MCP & More Extensions
- MCP server implementation (full)
- Railway extension
- Vercel extension
- Apple Reminders integration
- Cross-platform shell hooks (bash, fish, PowerShell)

### [0.4.0] - Phase 4: Web Dashboard
- Web interface for visual management
- Real-time sync status
- Analytics and reporting
- Mobile-responsive design

### [1.0.0] - Production Release
- 50+ extensions
- Stable plugin API
- Comprehensive test coverage
- Performance optimizations

---

[0.3.0]: https://github.com/YOUR_USERNAME/chittycan/releases/tag/v0.3.0
[0.2.0]: https://github.com/YOUR_USERNAME/chittycan/releases/tag/v0.2.0
[0.1.0]: https://github.com/YOUR_USERNAME/chittycan/releases/tag/v0.1.0
