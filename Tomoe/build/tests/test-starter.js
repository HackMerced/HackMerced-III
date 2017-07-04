import colors from 'colors';
import Mocha from 'mocha';
import fs from 'fs';
import path from 'path';
import { Database } from 'arangojs';

import { Definitions } from '../templates';
import { Config } from '../core/config';
import { createCollections } from '../util'

const databaseName = Definitions.server;
const SERVER_TESTS_DIR = './src/server/tests'

// Part two testing things
const mocha = new Mocha()

global.db = new Database({
  url: process.env.DB_URI
});

console.log('Pre-generating database at "Tomoe_test" to test server code!'.green);

db.listDatabases((err, databaseList) => {
  if(databaseList.includes(databaseName)){
    console.log('\nDropping existing test Database')

    db.dropDatabase(databaseName, () => {
      createDatabase();
    }, err => {
      console.log(('\n' + err.stack).red)
    });
    return;
  }

  createDatabase();
});

function createDatabase(){
  db.createDatabase(databaseName).then(
    info => {
      console.log('\nDatabase has been generated, begining tests!'.green);
      db.useDatabase(databaseName);

      createCollections([ 'user-test'] ).then(() => {
        readTestConfig();
      }).catch((err) => {
        console.log('\n');
        console.log(err.stack.red)
      })

    },
    err => {
      console.log('\n');
      console.log(err.stack.red)
    }
  );
}

let newTestConfig;


function readTestConfig(){
  // generating test config
  console.log('Generating tomoe.test.config.js...!');

  const configParams = { hackathon: 'testHackathon'};
  newTestConfig = new Config(configParams);
        newTestConfig.save().then(() => {
          setTomoeData();
        }).catch(err => {
          console.log(err);
        });

}

function setTomoeData(){
  const Tomoe = require('../../tomoe-test.config.js').Tomoe;
  global.TOMOE_CONFIG = Tomoe;

  startMochaTests();
}


// make sure your tests are loaded before running the tests

function startMochaTests() {
  function processMochaDirectories(rootDirectory){
    fs.readdirSync(rootDirectory).forEach((child) => {
      const childLocation = rootDirectory + '/' + child;
      if(fs.lstatSync(childLocation).isDirectory()){
        processMochaDirectories(childLocation);
      } else if(child.substr(-8) === '.spec.js') {
        mocha.addFile(
          path.join(rootDirectory, child)
        )
      }
    })
  }

  processMochaDirectories(SERVER_TESTS_DIR);

  // Now, you can run the tests.
  mocha.run(function(failures){
    process.on('exit', function () {
      startFrontEndTests(failures);  
    })
  })
}

function startFrontEndTests (failures){
  doneEverything(failures);
};

function doneEverything (failures){
  newTestConfig.delete();
  process.exit(failures);
};
