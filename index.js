const express = require('express')
const app = express()
const router = express.Router()
const port = 3000

// ----- App Configurations -----
app.use(express.json())
app.use('/api', router)

// ----- Routes -----
router.get('/', (req, res) => {
  res.send('Hello world!')
})
router.get('/folder', (req, res) => {

  let path = req.query.path;

  res.send(path)
})
router.post('/folder', (req, res) => {
  const { path, name } = req.body;

  res.send(path, name);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
