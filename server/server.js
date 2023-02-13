import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Service as servise } from './src/service'
import { Parser } from './src/parser'

const app = express()
const port = 4000

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

app.get('/startedLink', (req, res) => {
   res.send(servise.getPresaveUrlsFromDB())
})
app.post('/parseOne', async (req, res) => {
   console.log(req.body)
   const response = await servise.parseOne(req.body)
   console.log(response)
   res.send('response')
})
app.post('/parseMany', async (req, res) => {
   const response = await servise.parseMany(req.body)
   res.send(response)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

servise.initBrowser()