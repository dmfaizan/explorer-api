const express = require("express");
const { Op } = require("@sequelize/core");

const ItemType = require("./enums.js");
const sequelize = require("./database.js");
const Item = require("./models/item.js");

const app = express();
const router = express.Router();
const port = 3000;

// ----- App Configurations -----
app.use(express.json());
app.use("/api", router);

// ----- Routes -----
router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.get("/folder", async (req, res) => {
  const path = req.query.path;

  const folder = await Item.findOne({
    where: {
      path: path,
    },
  });

  if (!folder) {
    res.status(404).send(`Folder with path ${path} not found!`);
  }

  const content = await Item.findAll({
    where: {
      parentId: folder.id,
    },
  });

  res.send(content);
});

router.post("/folder", async (req, res) => {
  const { path, name } = req.body;
  let parentId;

  if (path == "~") {
    parentId = null;
  } else {
    // Find parent path
    let parentPath = path.split("/");
    parentPath.pop()
    parentPath = parentPath.join("/")

    const parent = await Item.findOne({
      where: {
        path: parentPath,
      },
    });

    if (!parent) {
      res.status(404).send(`Folder with path ${path} not found!`)
    }

    parentId = parent.id;
  }

  const newFolder = Item.build({
    name: name,
    type: ItemType.Folder,
    size: null,
    path: path,
    created: Date.now(),
    parentId: parentId,
  });

  await newFolder.save();

  res.send(newFolder);
});

router.delete("/item", async (req, res) => {
  const { path } = req.body;

  const item = await Item.findOne({
    where: {
      path: path,
    },
  });

  if (!item) {
    res.status(404).send(`Item with path ${path} not found!`);
  }

  await Item.destroy({
    where: {
      path: path,
    },
  });

  res.send("Item destroyed!");
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected!");
    app.listen(port, () => {
      console.log(`Server has started on port:${port}`);
    });
  })
  .catch((err) => console.log(err));
