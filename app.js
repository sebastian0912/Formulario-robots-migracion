const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow;

autoUpdater.autoDownload = false; // La descarga manual se gestionará después de la notificación

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4200');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(`file://${path.join(__dirname, 'dist/formularios-robots-migracion/browser/index.html')}`);
  }

  mainWindow.maximize();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Verificar actualizaciones
  autoUpdater.checkForUpdatesAndNotify();
}

// Obtener la versión de la aplicación
ipcMain.handle('version:get', () => {
  const packageJson = require(path.resolve(__dirname, 'package.json'));
  return packageJson.version;
});

// Obtener el entorno actual
ipcMain.handle('env:get', () => {
  return process.env.NODE_ENV || 'production';
});

// Evento para cuando haya una actualización disponible
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update-available');
  autoUpdater.downloadUpdate(); // Iniciar la descarga de la actualización
});

// Evento para el progreso de la descarga
autoUpdater.on('download-progress', (progressObj) => {
  mainWindow.webContents.send('download-progress', progressObj);
});

// Evento cuando la actualización haya sido descargada
autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('update-downloaded');
});

// Evento cuando no haya actualizaciones disponibles
autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('update-not-available');
});

// Evento cuando ocurra un error en el proceso de actualización
autoUpdater.on('error', (error) => {
  mainWindow.webContents.send('update-error', error);
});

// Reiniciar la aplicación después de la descarga de la actualización
ipcMain.on('restart-app', () => {
  autoUpdater.quitAndInstall();
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
