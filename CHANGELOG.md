# Changelog

All notable changes to ChittyTracker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-11-04

### Added - Phase 2: Plugin System & Extensions

**Plugin System**
- ✨ Dynamic plugin loading architecture
- ✨ Plugin lifecycle management (init/enable/disable)
- ✨ Command and remote type registration
- ✨ `chitty ext list/install/enable/disable` commands

**Extensions**
- ✨ `@chitty/cloudflare` - Workers, KV, R2, DNS management
- ✨ `@chitty/neon` - PostgreSQL databases, branches, migrations
- ✨ `@chitty/linear` - Issue tracking and GraphQL API

**Developer Experience**
- ✨ `chitty doctor` - Environment validation and health checks
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
- `chitty config` - Interactive configuration
- `chitty open <name> [view]` - Open remotes
- `chitty nudge now` - Interactive nudge
- `chitty checkpoint [msg]` - Log milestones
- `chitty sync setup/run/status` - Two-way sync
- `chitty hook install/uninstall zsh` - Shell integration

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

[0.2.0]: https://github.com/YOUR_USERNAME/chittytracker/releases/tag/v0.2.0
[0.1.0]: https://github.com/YOUR_USERNAME/chittytracker/releases/tag/v0.1.0
