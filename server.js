const express = require('express')

const app = express()

const port = process.env.PORT | 1337

// ---

app.get ('/', (req, res) => {
    res.redirect ('/tour')
})

app.get ('/test', (req, res) => {
    res.redirect ('/tour')
})

app.get ('/tour', (req, res) => {
    res.send('Hello there.')
})

app.listen (port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})