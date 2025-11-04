import inquirer from "inquirer";
import { loadConfig, saveConfig, type NotionRemote, type GitHubRemote, type Config } from "../lib/config.js";

export async function configMenu(): Promise<void> {
  const cfg = loadConfig();
  cfg.remotes ||= {};

  while (true) {
    const { action } = await inquirer.prompt([{
      type: "list",
      name: "action",
      message: "Chitty config",
      choices: [
        { name: "New remote", value: "new" },
        { name: "Edit remote", value: "edit" },
        { name: "Rename remote", value: "rename" },
        { name: "Delete remote", value: "delete" },
        { name: "Show config", value: "show" },
        { name: "Quit", value: "quit" }
      ]
    }]);

    if (action === "quit") break;

    if (action === "show") {
      console.log(JSON.stringify(cfg, null, 2));
      continue;
    }

    if (action === "new") {
      await addRemote(cfg);
      continue;
    }

    const names = Object.keys(cfg.remotes);
    if (!names.length) {
      console.log("[chitty] No remotes yet.");
      continue;
    }

    const { name } = await inquirer.prompt([{
      type: "list",
      name: "name",
      message: "Select remote",
      choices: names
    }]);

    if (action === "edit") {
      await editRemote(cfg, name);
    } else if (action === "rename") {
      const { newName } = await inquirer.prompt([{
        name: "newName",
        message: "New name",
        validate: (v: string) => v ? true : "Required"
      }]);
      cfg.remotes[newName] = cfg.remotes[name];
      delete cfg.remotes[name];
      saveConfig(cfg);
      console.log(`[chitty] Renamed '${name}' → '${newName}'`);
    } else if (action === "delete") {
      const { yes } = await inquirer.prompt([{
        type: "confirm",
        name: "yes",
        message: `Delete '${name}'?`,
        default: false
      }]);
      if (yes) {
        delete cfg.remotes[name];
        saveConfig(cfg);
        console.log(`[chitty] Deleted '${name}'`);
      }
    }
  }
}

async function addRemote(cfg: Config): Promise<void> {
  const { remoteType } = await inquirer.prompt([{
    type: "list",
    name: "remoteType",
    message: "Remote type",
    choices: [
      { name: "Notion database", value: "notion-database" },
      { name: "Notion page", value: "notion-page" },
      { name: "Notion view", value: "notion-view" },
      { name: "GitHub project", value: "github-project" }
    ]
  }]);

  if (remoteType.startsWith("notion")) {
    await addNotionRemote(cfg, remoteType);
  } else if (remoteType === "github-project") {
    await addGitHubRemote(cfg);
  }
}

async function addNotionRemote(cfg: Config, type: string): Promise<void> {
  const ans = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Remote name",
      validate: (v: string) => v ? true : "Required"
    },
    {
      type: "input",
      name: "url",
      message: "Notion URL",
      validate: (v: string) => v?.startsWith("http") ? true : "Enter a valid URL"
    }
  ]);

  const remote: NotionRemote = { type: type as any, url: ans.url, views: {} };

  if (type === "notion-database") {
    const views = await inquirer.prompt([
      { name: "actions", message: "Actions view URL (optional)", default: "" },
      { name: "aiUsage", message: "AI usage view URL (optional)", default: "" },
      { name: "projects", message: "Projects view URL (optional)", default: "" }
    ]);

    Object.entries(views).forEach(([k, v]) => {
      if (v) remote.views![k] = v as string;
    });

    // Extract database ID from URL (format: notion.so/DBID?v=VIEWID)
    const dbIdMatch = ans.url.match(/notion\.so\/([a-f0-9]{32})/);
    if (dbIdMatch) {
      remote.databaseId = dbIdMatch[1];
    }

    // If URL has a view parameter, save it as default view
    const viewIdMatch = ans.url.match(/[?&]v=([a-f0-9]{32})/);
    if (viewIdMatch) {
      remote.views!.default = ans.url;
    }
  }

  cfg.remotes[ans.name] = remote;
  saveConfig(cfg);
  console.log(`[chitty] Added remote '${ans.name}' (${type})`);
}

async function addGitHubRemote(cfg: Config): Promise<void> {
  const ans = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Remote name",
      validate: (v: string) => v ? true : "Required"
    },
    {
      type: "input",
      name: "owner",
      message: "GitHub owner/org",
      validate: (v: string) => v ? true : "Required"
    },
    {
      type: "input",
      name: "repo",
      message: "Repository name",
      validate: (v: string) => v ? true : "Required"
    },
    {
      type: "input",
      name: "projectNumber",
      message: "Project number (optional)",
      default: ""
    }
  ]);

  const remote: GitHubRemote = {
    type: "github-project",
    owner: ans.owner,
    repo: ans.repo
  };

  if (ans.projectNumber) {
    remote.projectNumber = parseInt(ans.projectNumber, 10);
  }

  cfg.remotes[ans.name] = remote;
  saveConfig(cfg);
  console.log(`[chitty] Added GitHub remote '${ans.name}' (${ans.owner}/${ans.repo})`);
}

async function editRemote(cfg: Config, name: string): Promise<void> {
  const current = cfg.remotes[name];

  if (!current) {
    console.log(`[chitty] Remote '${name}' not found`);
    return;
  }

  if (current.type.startsWith("notion")) {
    await editNotionRemote(cfg, name, current as NotionRemote);
  } else if (current.type === "github-project") {
    await editGitHubRemote(cfg, name, current as GitHubRemote);
  }
}

async function editNotionRemote(cfg: Config, name: string, current: NotionRemote): Promise<void> {
  const base = await inquirer.prompt([
    {
      name: "url",
      message: "Notion URL",
      default: current.url,
      validate: (v: string) => v?.startsWith("http") ? true : "Enter a valid URL"
    }
  ]);

  current.url = base.url;

  if (current.type === "notion-database") {
    const views = await inquirer.prompt([
      { name: "actions", message: "Actions view URL", default: current.views?.actions || "" },
      { name: "aiUsage", message: "AI usage view URL", default: current.views?.aiUsage || "" },
      { name: "projects", message: "Projects view URL", default: current.views?.projects || "" }
    ]);

    current.views = {};
    Object.entries(views).forEach(([k, v]) => {
      if (v) current.views![k] = v as string;
    });

    // Extract database ID (format: notion.so/DBID?v=VIEWID)
    const dbIdMatch = base.url.match(/notion\.so\/([a-f0-9]{32})/);
    if (dbIdMatch) {
      current.databaseId = dbIdMatch[1];
    }

    // If URL has a view parameter, save it as default view
    const viewIdMatch = base.url.match(/[?&]v=([a-f0-9]{32})/);
    if (viewIdMatch) {
      current.views!.default = base.url;
    }
  }

  cfg.remotes[name] = current;
  saveConfig(cfg);
  console.log(`[chitty] Updated remote '${name}'`);
}

async function editGitHubRemote(cfg: Config, name: string, current: GitHubRemote): Promise<void> {
  const ans = await inquirer.prompt([
    {
      name: "owner",
      message: "GitHub owner/org",
      default: current.owner,
      validate: (v: string) => v ? true : "Required"
    },
    {
      name: "repo",
      message: "Repository name",
      default: current.repo,
      validate: (v: string) => v ? true : "Required"
    },
    {
      name: "projectNumber",
      message: "Project number (optional)",
      default: current.projectNumber?.toString() || ""
    }
  ]);

  current.owner = ans.owner;
  current.repo = ans.repo;

  if (ans.projectNumber) {
    current.projectNumber = parseInt(ans.projectNumber, 10);
  } else {
    delete current.projectNumber;
  }

  cfg.remotes[name] = current;
  saveConfig(cfg);
  console.log(`[chitty] Updated GitHub remote '${name}'`);
}
