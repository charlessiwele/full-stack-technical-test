import express from 'express'
import MakeRequests from './MakeRequests.js'
import cors from "cors";


const app = express()
const port = 3000
const makeRequests = new MakeRequests()

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/getbootstrap', async (req, res) => {
  const data = await makeRequests.makeExternalGetRequest('bootstrap-static/');
  res.setHeader('Content-Type', 'application/json');
  res.json(data.data)

})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}/`)
})