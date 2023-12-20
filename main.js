/**MAIN PROCESS */

const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios');

function createWindow () {
   const win = new BrowserWindow({
      width: 800,
      height: 700,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false
      }
   })

   win.loadFile('index.html') 
   
   ipcMain.on('fetch-data', async (event, args) => {
      try {
         const response = await axios.get('https://v6.exchangerate-api.com/v6/670f855b4ff47fc9e20d9f8d/latest/CAD');
         
         event.reply('fetch-data-response', response.data);
      } catch (error) {
         console.error(error);
      }
   });

}

ipcMain.on('fetch-data-devise', async function(event, devise){
   try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/670f855b4ff47fc9e20d9f8d/latest/${devise}`);
      event.reply('fetch-data-response-devise', response.data);
   } catch (error) {
      console.error(error);
   }
})

ipcMain.on('close', () =>{
   app.quit();
})

app.whenReady().then(createWindow);
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })