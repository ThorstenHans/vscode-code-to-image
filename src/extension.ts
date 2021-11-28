import * as vscode from 'vscode';
import { createImageFromCode } from './code2image';

export function activate(context: vscode.ExtensionContext) {

    console.log('Code to Image: activated!');

    let fromDocumentHandle = vscode.commands.registerCommand('code_to_image.fromDocument', () => {
        createImageFromCode(false);
    });
    let fromSelectionHandle = vscode.commands.registerCommand('code_to_image.fromSelection', () => {
        createImageFromCode(true);
    });

    context.subscriptions.push(fromSelectionHandle, fromDocumentHandle);
}

// this method is called when your extension is deactivated
export function deactivate() { }
