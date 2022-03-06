const { 
	app, 
	BrowserWindow 
} = require('electron');
const { exit } = require('process');
const { isObject } = require('util');
const nativeImage = require('electron').nativeImage;
const fs = require('fs');
var ico = nativeImage.createFromPath(__dirname + '/images/flyingshoes.png');
const fileName = './package.json';
const file = require(fileName);

app.whenReady().then(createWindow)
      
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 786,
    icon: ico,
    plugins: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html');
  //win.setMenuBarVisibility(false);
}