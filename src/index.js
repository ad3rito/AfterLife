const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path');

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

async function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,    
    frame: false,
    show: false,
    fullscreen:true,
    center: true,
    images: false,
    resizable: false,
		minWidth: 1920,
    minHeight: 1080,
    title: "AfterLife",
    "icon": "src/icon/rocket.ico",
		webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: false,  // turn off remote
      contextIsolation: true,     // protect against prototype pollution
      webgl: true,
      webSecurity: true
    },
    backgroundColor: '#0a0a0a'
  });

  //mainWindow.webContents.openDevTools();

  ipcMain.on("error", (_, ev) => {
    console.error(ev);
  });

  mainWindow.webContents.on("did-finish-load", () => {
  mainWindow.webContents.send("cmd", process.argv);
  });

  // Once loaded, show the screen
  mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
		mainWindow.show();
  });

  mainWindow.setMenu(null);

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });
}

app.allowRendererProcessReuse = true;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
