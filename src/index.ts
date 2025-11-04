#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { configMenu } from "./commands/config.js";
import { open, listRemotes } from "./commands/open.js";
import { nudgeNow, nudgeQuiet } from "./commands/nudge.js";
import { checkpoint, listCheckpoints } from "./commands/checkpoint.js";
import { installZsh, uninstallZsh } from "./commands/hook.js";
import { syncSetup, syncRun, syncStatus } from "./commands/sync.js";
import { listExtensions, enableExtension, disableExtension, installExtension } from "./commands/extension.js";
import { PluginLoader } from "./lib/plugin.js";
import { doctor } from "./commands/doctor.js";

// Load plugins early
const config = (await import("./lib/config.js")).loadConfig();
const pluginLoader = new PluginLoader(config);
await pluginLoader.loadAll();

yargs(hideBin(process.argv))
  .scriptName("chitty")
  .usage("$0 <command> [options]")
  .command(
    "config",
    "Interactive configuration menu (rclone-style)",
    () => {},
    async () => {
      await configMenu();
    }
  )
  .command(
    "remote",
    "Manage remotes",
    (yargs) =>
      yargs.command(
        "list",
        "List all configured remotes",
        () => {},
        () => {
          listRemotes();
        }
      ),
    () => {
      yargs.showHelp();
    }
  )
  .command(
    "open <name> [view]",
    "Open a remote in browser",
    (yargs) =>
      yargs
        .positional("name", {
          describe: "Remote name",
          type: "string",
          demandOption: true
        })
        .positional("view", {
          describe: "View name (optional)",
          type: "string"
        }),
    (argv) => {
      open(argv.name as string, argv.view as string);
    }
  )
  .command(
    "nudge",
    "Reminder commands",
    (yargs) =>
      yargs
        .command(
          "now",
          "Interactive nudge to update tracker",
          () => {},
          async () => {
            await nudgeNow();
          }
        )
        .command(
          "quiet",
          "Quick reminder (non-interactive)",
          () => {},
          () => {
            nudgeQuiet();
          }
        ),
    () => {
      yargs.showHelp();
    }
  )
  .command(
    "checkpoint [message]",
    "Save a checkpoint with optional message",
    (yargs) =>
      yargs.positional("message", {
        describe: "Checkpoint message",
        type: "string"
      }),
    (argv) => {
      checkpoint(argv.message as string);
    }
  )
  .command(
    "checkpoints [limit]",
    "List recent checkpoints",
    (yargs) =>
      yargs.positional("limit", {
        describe: "Number of checkpoints to show",
        type: "number",
        default: 10
      }),
    (argv) => {
      listCheckpoints(argv.limit as number);
    }
  )
  .command(
    "hook",
    "Manage shell hooks",
    (yargs) =>
      yargs
        .command(
          "install <shell>",
          "Install shell hooks",
          (yargs) =>
            yargs.positional("shell", {
              describe: "Shell type",
              type: "string",
              choices: ["zsh"],
              demandOption: true
            }),
          (argv) => {
            if (argv.shell === "zsh") {
              installZsh();
            }
          }
        )
        .command(
          "uninstall <shell>",
          "Uninstall shell hooks",
          (yargs) =>
            yargs.positional("shell", {
              describe: "Shell type",
              type: "string",
              choices: ["zsh"],
              demandOption: true
            }),
          (argv) => {
            if (argv.shell === "zsh") {
              uninstallZsh();
            }
          }
        ),
    () => {
      yargs.showHelp();
    }
  )
  .command(
    "ext",
    "Manage extensions",
    (yargs) =>
      yargs
        .command(
          "list",
          "List installed extensions",
          () => {},
          async () => {
            await listExtensions();
          }
        )
        .command(
          "install <name>",
          "Install an extension",
          (yargs) =>
            yargs.positional("name", {
              describe: "Extension name",
              type: "string",
              demandOption: true
            }),
          async (argv) => {
            await installExtension(argv.name as string);
          }
        )
        .command(
          "enable <name>",
          "Enable an extension",
          (yargs) =>
            yargs.positional("name", {
              describe: "Extension name",
              type: "string",
              demandOption: true
            }),
          async (argv) => {
            await enableExtension(argv.name as string);
          }
        )
        .command(
          "disable <name>",
          "Disable an extension",
          (yargs) =>
            yargs.positional("name", {
              describe: "Extension name",
              type: "string",
              demandOption: true
            }),
          async (argv) => {
            await disableExtension(argv.name as string);
          }
        ),
    () => {
      yargs.showHelp();
    }
  )
  .command(
    "doctor",
    "Check environment and configuration",
    () => {},
    async () => {
      await doctor();
    }
  )
  .command(
    "sync",
    "Sync between Notion and GitHub",
    (yargs) =>
      yargs
        .command(
          "setup",
          "Configure sync",
          () => {},
          async () => {
            await syncSetup();
          }
        )
        .command(
          "run",
          "Run sync now",
          (yargs) =>
            yargs.option("dry-run", {
              describe: "Preview changes without applying",
              type: "boolean",
              default: false
            }),
          async (argv) => {
            await syncRun(argv["dry-run"]);
          }
        )
        .command(
          "status",
          "Show sync configuration",
          () => {},
          () => {
            syncStatus();
          }
        ),
    () => {
      yargs.showHelp();
    }
  )
  .demandCommand(1, "You must provide a command")
  .strict()
  .help()
  .alias("h", "help")
  .version()
  .alias("v", "version")
  .parse();
