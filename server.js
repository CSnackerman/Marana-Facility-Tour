const express = require('express')

const app = express()

const port = process.env.PORT || 1337

// ---

app.get ('/', (req, res) => {
    res.redirect ('/tour')
})

app.get ('/test', (req, res) => {
    res.redirect ('/tour')
})

app.use ('/tour', express.static ('public'))

app.listen (port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})