const express = require('express'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      methodOverride = require('method-override'),
      http = require('http'),
      path = require('path'),
      app = express(),
      multipart = require('connect-multiparty'),
      multipartMiddleware = multipart(),
      request = require('request'),
      Database = require('arangojs').Database;


class Hackathon{
  constructor(name, capacity){
    try {

      this.name = name;
      this.capacity = capacity;

    } catch(e) {
      new Error("");
    }
  }
}

function setUpDatabases(resolve){
  const db = new Database(process.env.DB_URI);
        db.useDatabase(((process.env.MODE && process.env.MODE !== "live") ? (process.env.MODE + "_") : "" )+ "tomoe_hacks");

  let d = {
          Hackers: db.collection('hackers'),
          Hackathons: db.collection('hackathons'),
          Companies: db.collection('companies'),
          CompanyUsers: db.collection('company_users'),
          atabase: db,
        }

  const hackathon_key = 0; // always the first document

  d.Hackathons.lookupByKeys([hackathon_key], function(err, data){
      if(err){
        throw err;
      } else {
        d.Hackathon = data[0];
        resolve(d);
      }
    });
}

module.exports = function(status){
  // load environmental vars
  if(status === "test"){
    require('dotenv').config({path: '.env_test'});
  } else {
    require('dotenv').config();
  }



  setUpDatabases(function(d){

    // set up new db
    let collections = d;
    let db = d.atabase;

    // set base directory as one above
    __dirname = __dirname + "/..";

    // set app

    app.set('port', process.env.PORT);
    app.set('views', path.join( __dirname , 'views'));
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({ secret: process.env.SESSIONSECRET, resave:false, saveUninitialized:false}));
    app.use(methodOverride());

    // warning
    if(status === "dev"){
      console.log(
        `\n******************************************************************
         \n***YOU ARE CURRENTLY RUNNING A DEVELOPMENT VERSION OF THIS APP**
         \n******************************************************************
         \nPlease make sure you are developing right now, and not using this
         \nfor production.
         \n
         \nTo set up server for production, please use node production.js.
         \n******************************************************************
         \n`
      );
      }

    // routes to pages
    require('./routes/routes.js')(app, db, collections);


    app.use(express.static(path.join(__dirname, 'public')));

    app.listen(app.get('port'), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.info(`Server listening on port ${app.get('port')}!`);
      }
    });

  })
};
