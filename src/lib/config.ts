import fs from "fs";
import path from "path";
import os from "os";

export interface NotionRemote {
  type: "notion-database" | "notion-page" | "notion-view";
  url: string;
  databaseId?: string;
  views?: Record<string, string>;
}

export interface GitHubRemote {
  type: "github-project";
  owner: string;
  repo: string;
  projectNumber?: number;
}

export interface Config {
  remotes: Record<string, NotionRemote | GitHubRemote>;
  nudges: {
    enabled: boolean;
    intervalMinutes: number;
  };
  sync?: {
    enabled: boolean;
    notionToken?: string;
    githubToken?: string;
    mappings?: Array<{
      notionRemote: string;
      githubRemote: string;
    }>;
  };
}

const CONFIG_DIR = path.join(os.homedir(), ".config", "chitty");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

export function loadConfig(): Config {
  try {
    const data = fs.readFileSync(CONFIG_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return {
      remotes: {},
      nudges: {
        enabled: true,
        intervalMinutes: 45
      }
    };
  }
}

export function saveConfig(cfg: Config): void {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), "utf8");
}

export function getConfigPath(): string {
  return CONFIG_PATH;
}
