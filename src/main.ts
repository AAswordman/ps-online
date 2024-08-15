import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron';
import * as path from 'path';
let mainWindow: Electron.BrowserWindow | null;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        height: 600,
        icon: path.join(__dirname, '../icon512.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false
        },
        width: 800
    });
    mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null);
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
    mainWindow.on('closed', () => {
        mainWindow = null;
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