const express = require('express')

const { ItemType } = require('./enums.js')
const { items } = require('./items.js')

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
  const path = req.query.path;

  if (path != undefined) {
    const folder = items.find(item => item.name == path);
    const contents = items.filter(item => folder.childIds.includes(item.id))

    res.send(contents)
  } else {
    res.send(items)
  }

})

router.post('/folder', (req, res) => {
  const { path, name } = req.body;

  const newFolder = {
    "id": items.length,
    "name": name,
    "type": ItemType.Folder,
    "size": null,
    "path": path,
    "created": Date.now(),
    "childIds": []
  };

  items.push(newFolder);

  res.send(items);
})

router.delete('/item', (req, res) => {
  const { path } = req.body;

  const item = items.find(item => item.path == path);
  const index = items.indexOf(item);
  items.splice(index, 1);

  res.send(items)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
