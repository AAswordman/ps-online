import { app, BrowserWindow } from 'electron';
import * as path from 'path';
let mainWindow: Electron.BrowserWindow;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity:false
        },
        width: 800
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
    mainWindow.on('closed', () => {
        mainWindow.destroy();
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
