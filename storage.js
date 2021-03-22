const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, _file, callback) {
        callback(null, "./uploads/");
    },
    fileFilter(file, callback) {
        if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
            callback(new Error("only upload files with jpg or jpeg format."));
        }
        callback(undefined, true);
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now());
    },
});
const upload = multer({ storage: storage });
exports.storage = storage;
