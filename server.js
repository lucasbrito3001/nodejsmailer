const app = require('./src/app')
const os = require('os')

const port = process.env.API_PORT

const serverMessage = `
===============================================
The server is running on port: ${port}
-----------------------------------------------
Infos:
    - node version: ${process.version}
    - OS server: ${process.platform}
    - server arch: ${process.arch}
    - cpus: ${os.cpus().length}
===============================================
`

app.listen(port, () => {
    console.log(serverMessage.trim())
})