import * as vscode from 'vscode';

export const ConfigSectionName = "code_to_image";

export class Configuration {

    constructor(public padding: number,
        public renderBackground: boolean,
        public renderDarkMode: boolean,
        public autoDetectLanguage: boolean,
        public theme: string) {

    }
    public static fromDefaults(): Configuration {
        return new Configuration(16, true, true, true, "candy");
    }

    public static fromWorkspaceConfig(config: vscode.WorkspaceConfiguration): Configuration {
        if (!config) {
            return Configuration.fromDefaults();
        }

        return new Configuration(config.get<number>("padding") || 0,
            config.get("renderBackground")!,
            config.get("renderDarkMode")!,
            config.get("autoDetectLanguage")!,
            config.get("theme") || "candy");
    }
}
