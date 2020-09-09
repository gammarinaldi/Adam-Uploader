const upload = require("../middleware/upload");
const path = require("path");

const uploadFile = async (req, res) => {
  try {
    await upload(req, res);

    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    // res.send(`File has been uploaded.`);
    return res.redirect('/?message=SUCCESS');
  } catch (error) {
    console.log(error);
    // return res.send(`Error when trying upload file: ${error}`);
    return res.redirect('/?message=FAILED');
  }
};

module.exports = {
  uploadFile: uploadFile
};