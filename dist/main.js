"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        icon: path.join(__dirname, '../icon512.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false
        },
        width: 800
    });
    mainWindow.setMenu(null);
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map