const uuid = require('uuid');
const path = require('path');
const log = require(INCPATH + '/log')(module);
const config = require(INCPATH + "/config");
var fs = require('fs');

class FileService {
  saveFile(file) {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(config.get("public_path"),'images',fileName);
      file.mv(filePath);
      return fileName;
    } catch (err) {
      log.error(err);
    }
  }
  async deleteFile(fileName){
      const filePath = path.resolve(config.get("public_path"),'images',fileName);
      if(filePath.includes('plug.png')) return;
      fs.unlink(filePath, function(err){
        if (err) {
            log.error(err);
        } else {
            log.info("Image deleted");
        }
    });

  }
}

module.exports = new FileService();
