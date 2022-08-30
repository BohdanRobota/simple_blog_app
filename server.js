global.ABSPATH = __dirname;
global.INCPATH = ABSPATH + "/libs";

const path = require("path"); 
const express = require("express"); 
const app = express();
const config = require(INCPATH + "/config");
const log = require(INCPATH + "/log")(module); 

const cors = require("cors"); 
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./config/swagger.yaml");
const articleRoutes = require('./routes/articleRoute.js');
const mainPageRoute = require('./routes/mainPageRoute.js')
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");

app.use(cors());
app.use(express.static(path.resolve(__dirname,config.get("public_path"))));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(fileUpload());

app.use(mainPageRoute);
app.use('/api',articleRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



mongoose.connect(config.get('db'), { useUnifiedTopology: true, useNewUrlParser: true}, function(err){
    if(err) {
      return log.error('db connection error:', err.message);
    }else{
      log.info('Connected to DB!');
      app.listen(config.get("port"), function() {
        log.info("Server start running on port " + config.get("port"));
      });
    }
});


