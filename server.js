const app = require('./src/app')

const port = process.env.API_PORT

const serverMessage = `
===============================================
The server is running on port: ${port}
-----------------------------------------------
Infos:
    - node version: ${process.version}
    - OS server: ${process.platform}
    - server arch: ${process.arch}
===============================================
`

app.listen(port, () => {
    console.log(serverMessage.trim())
})