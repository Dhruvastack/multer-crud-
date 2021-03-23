const express = require("express");
const multer = require("multer");

const Photo = require("./models.js");
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, callback) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      callback(new Error("only upload files with jpg or jpeg or png format."));
    }
    callback(null, true);
  },
});
//post api
router.post("/", upload.single("file"), (req, res, next) => {
  const photo = new Photo({
    file: req.file.filename,
  });

  photo
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Created photo successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//delete api
router.delete("/:id", function (req, res) {
  Photo.findByIdAndRemove(req.params.id)
    .then((photo) => {
      if (!photo) {
        return res.status(404).send({
          message: "Photo not found with id " + req.params.id,
        });
      }
      res.send({ message: "Photo deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Photo not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete Photo with id " + req.params.id,
      });
    });
});
//edit api
router.put("/edit/:id", upload.single("file"), (req, res) => {
  const id = req.params.id;
  const file = req.file.filename;
  Photo.findByIdAndUpdate(
    id,
    {
      $set: {
        file,
      },
    },

    { new: true }
  )
    .then((file) => {
      if (!file) {
        return res.status(404).send({
          message: "Photo not found with id mmmmm " + req.params.id,
        });
      }
      res.send(file);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Photo not found with id >>>>>>>>" + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating photo with id " + req.params.id,
      });
    });
});
//get api
router.get("/photos", (req, res) => {
  Photo.find()

    .then((files) => {
      res.json({ files });
    })
    .catch((err) => {
      console.log(err);
    });
});

// gett the files by id
router.get("/:id", (req, res) => {
  Photo.findById(req.params.id)
    .then((file) => {
      if (!file) {
        return res.status(404).send({
          message: "File not found with id " + req.params.id,
        });
      }
      res.send(file);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "File not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving file with id " + req.params.id,
      });
    });
});

module.exports = router;
