const express = require('express')
const app = express()
const config = require('./config.js')
const fetch = require('node-fetch')

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/:url', async(req, res) => {
    let url = req.params.url
    if (url) {
        let url = req.url
        url = url.split('/url?=').pop()
        if (url) {
            if (url.startsWith('https://cdn.discordapp.com')) {
                let response = await fetch(url)
                let text = await response.text()
                res.send(text)
            } else {
                res.send('Invalid URL!')
            }
        } else {
            res.send('Invalid URL!')
        }
    } else {
        res.send('Invalid URL!')
    }
})

app.get('/', async(req, res) => {
    res.redirect(config.defaultWebsite)
})


app.listen(config.port, () => {
    console.log(`[SERVER RUNNING] The server is now running and listening on port ${config.port}.`)
})