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

router.put("/edit/:id", upload.single("file"), (req, res) => {
  Photo.findByIdAndUpdate(
    req.params.id,

    {
      $set: {
        file: req.file.filename,
      },
    },

    { new: true }
  )
    .then((photo) => {
      if (!photo) {
        return res.status(404).send({
          message: "Photo not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Photo not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating photo with id " + req.params.id,
      });
    });
  // Photo.findOneAndUpdate(
  //   id,
  //   {
  //     $set: {
  //       file,
  //     },
  //   },
  //   { new: true }
  // )
  //   // .then((post) => {
  //   //   req.flash("success", "Edits submitted successfully");
  //   // })
  //   .then((result) => {
  //     console.log(result);
  //     res.status(200).json({
  //       message: "Edited photo successfully",
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });
});

module.exports = router;
