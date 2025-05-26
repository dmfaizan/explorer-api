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

  const content = await Item.findAll({
    where: {
      id: {
        [Op.in]: folder.childIds,
      },
    },
  });

  res.send(content);
});

router.post("/folder", async (req, res) => {
  const { path, name } = req.body;

  const newFolder = Item.build({
    name: name,
    type: ItemType.Folder,
    size: null,
    path: path,
    created: Date.now(),
    childIds: [],
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
    res.send("No item found with that path!");
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
