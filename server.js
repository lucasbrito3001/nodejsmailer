const app = require('./src/app')

const port = 5001

app.listen(port, () => {
    console.log('The server is running on port: ' + port)
})