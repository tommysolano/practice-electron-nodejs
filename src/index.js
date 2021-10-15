const { app, BrowserWindow, Menu } = require("electron")
const url = require("url")
const path = require("path")

if(process.env.NODE_ENV !== "production"){
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "../node_modules", ".bin", "electron")
    })
}

let mainWindow
let newProductWindow

app.on("ready", ()=>{
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/index.html"),
        protocol: "file",
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on("close", ()=>{
        app.quit()
    })
})


function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: "add a new product"
    });
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/new-product.html"),
        protocol: "file",
        slashes: true
    }));
    newProductWindow.setMenu(null);
    newProductWindow.on("close", () => {
        newProductWindow = null
    })
}


const templateMenu = [
    {
        label: "File",
        submenu: [
            {
                label: "New Product",
                accelerator: "Ctrl+N",
                click(){
                    createNewProductWindow()
                }
            },
            {
                label: "remove all products"
            },
            {
                label: "Exit",
                accelerator: process.platform == "darwin" ? "command+Q" : "Ctrl+Q",
                click(){
                    app.quit()
                }
            }
        ]
    }
]

if(process.platform === "darwin"){
    templateMenu.unshift({
        label: app.getName()
    })
}

if(process.env.NODE_ENV !==  "production") {
    templateMenu.push({
        label: "DevTools",
        submenu: [
            {
                label: "Show/Hide Dev Tools",
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: "reload"
            }
        ]
    })
}