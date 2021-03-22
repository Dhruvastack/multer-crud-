
// const Photo = require("./models.js");

// const multer = require("multer");
// exports.create = (req, res) => {

//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, "/uploads");
//         },
//         fileFilter(req, file, cb) {
//           if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
//             cb(new Error("only upload files with jpg or jpeg format."));
//           }
//           cb(undefined, true); // continue with upload
//         },
//         filename: function (req, file, cb) {
//           cb(null, file.fieldname + "-" + Date.now());
//         },
//       });
      
//       const upload = multer({ storage: storage });
//   const photo = new Photo({
//     photo: req.file.filename,
//   });


//   photo
//     .save()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while uploading image.",
//       });
//     });
// };
