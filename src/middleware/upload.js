const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
var excelToMongoDB = require('excel-to-mongodb');
const path = require("path");

var host = "mongodb+srv://adam:3Xi0O1syMARRGykK@cluster0.tijjc.mongodb.net/adam?retryWrites=true&w=majority"

var storage = new GridFsStorage({
  url: host,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
    var file_path = path.resolve(file.originalname)
    console.log("###################### File Path: " + file_path + " ######################");
    excelToMongoDB.covertToMongo({host: host, path: file_path, collection: "athar", db: "adam"}, {}, function(error, results){
      error ? console.log(error) : console.log(results.length)
    });

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-adam_athar-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "excel_files",
      filename: `${Date.now()}-adam_athar-${file.originalname}`
    };
  }
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);

module.exports = uploadFilesMiddleware;