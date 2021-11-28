import * as vscode from 'vscode';
import { ConfigSectionName, Configuration } from './config';

function buildUrl(code: string, codeLang: string, cfg: Configuration): string {
    const title = 'Snippet';
    const lang = cfg.autoDetectLanguage ? "auto" : codeLang;
    return `https://ray.so/?colors=${cfg.theme}&background=${cfg.renderBackground}&darkMode=${cfg.renderDarkMode}&padding=${cfg.padding}&title=${title}&code=${code}&language=${lang}`
}

function getCode(editor: vscode.TextEditor, useSelection: boolean): string {
    if (!useSelection) {
        return editor.document.getText();
    }
    return editor.document.getText(editor.selection);
}

export function createImageFromCode(fromSelection: boolean) {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !editor.selection) {
        return;
    }

    const cfg = Configuration.fromWorkspaceConfig(vscode.workspace.getConfiguration(ConfigSectionName));
    const code = getCode(editor!, fromSelection);

    if (code) {
        const buf = Buffer.from(code);
        const encoded = encodeURIComponent(buf.toString('base64'));
        const u = buildUrl(encoded, editor.document.languageId, cfg);
        const url = vscode.Uri.parse(u);
        vscode.env.openExternal(url);
    }
}
