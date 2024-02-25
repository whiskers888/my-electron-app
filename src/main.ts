// Импортируем модули 
import { app, BrowserWindow } from 'electron'

// Произвольный порт для Electron 
const PORT = 7259

// Окно приложения Electron 
let win: BrowserWindow | null

// Функция для создания нового окна приложения 
const createWindow = () => {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
  })
    // Загружаем файл HTML из каталога frontend 
    win.title = 'Hello World | Electron'
    // load index.html running on the url
    win.loadFile("./my-app/build/index.html");
    // Open the DevTools.
    win.webContents.openDevTools()
    
    win.on('closed', () => {
        win = null
    })
}

// Настройка обратных вызовов GUI для разных событий 
// Код помещен в конструкцию if, позволяя проводить тестирование в браузере во время разработки 
if (app) {
  // В момент инициализации приложения вызываем  createWindow 
  app.on('ready', () => {
    createWindow()
  })
  // При закрытии всех окон приложения выходим из него (не касается //MacOS) 
  app.on('window-all-closed', () => {
    // Даже когда все окна закрыты, приложения MacOS обычно продолжают выполняться в фоновом режиме, пока пользователь явно не выйдет из приложения через панель Dock. 
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  // Когда приложение, выполнявшееся в фоновом режиме, "активировано", вызываем  createWindow 
  // Необходимость этого объясняется вышеупомянутой особенностью MacOS выполнять приложения при закрытых окнах 'window-all-closed' 
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
}
