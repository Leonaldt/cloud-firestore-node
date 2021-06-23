const express = require('express')
const cors = require('cors')

const usersRouter = require('./routers/users')
const serversRouter = require('./routers/servers')

const app = express()
const port = process.env.PORT

var whitelist = ['http://localhost:4200']
var corsOptions = {
    origin: function (origin, callback) {
        console.log('origin: ', origin)
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(usersRouter)
app.use(serversRouter)

app.listen(port, () => {
    console.log (`Server is up on port ${port}`)
})