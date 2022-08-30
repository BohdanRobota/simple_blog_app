const { async } = require("q");
const log = require(INCPATH + '/log')(module);

class mainPageController{
  async getMainPage(req,res){
    try{
      res.sendFile(path.resolve(ABSPATH, config.get("public_path")));
    } catch(err){
      res.status(500).json(err);
    }
  }

}


module.exports = new mainPageController();