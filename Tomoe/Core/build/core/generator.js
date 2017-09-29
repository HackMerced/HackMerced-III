/*
  _______
 |__   __|
    | | ___  _ __ ___   ___   ___
    | |/ _ \| '_ ` _ \ / _ \ / _ \
    | | (_) | | | | | | (_) |  __/
    |_|\___/|_| |_| |_|\___/ \___|

    Version 2.0
*/

import figlet from 'figlet';
import packageDetail from '../../package.json';
import colors from 'colors';
import readline from 'readline-sync';
import {Database, aql} from 'arangojs';
import Joi from 'joi';
import fs from 'fs';

import { Admin } from '../../src/server/src/collections';
import { createCollections, moveFile } from '../util'
import { env, Definitions } from '../templates';
import { Config } from './config'


const term = console.log; // easier to type
function divider() {  term('\n==') };
function createValidationError(validate){
  return validate.details[0].message.replace('"value"', 'This field')
}

const YESNO_CONTEXT = "\n Type 'Yes' or 'No' to continue: ".grey;
const TOMOE_CONFIG_PATH = `./${Definitions.configName}`

const databaseName = Definitions.server;


let storedAnswers = new Config();

let adminDetails;

const stage = {
  currentStage: 0,
  start:function(){
    stage.steps[0]();
  },
  next:function(){
    stage.currentStage++;
    stage.steps[stage.currentStage]();
  },
  prev:function(){
    stage.currentStage--;
    stage.steps[stage.currentStage]();
  },
  same:function(){
    stage.steps[stage.currentStage]();
  },
  steps:[
    function introduction(){
      term('\n====================================');
      term(figlet.textSync('Tomoe'));
      term('====================================\n');
      term(`You are running the installer for Tomoe v${packageDetail.version}\n`.green);
      stage.next();
    },
    function checkEnv(){
      term('Checking for environmental variables...');

      let missingList = [];

      for(let req in env){
        const reqData = env[req];



        if(!process.env[req] ||
           (process.env[req] && reqData.filter && Joi.validate(process.env[req], reqData.filter).error)){
          missingList.push({ id: req, value: reqData });
        }
      }


      if(missingList.length){
        term('\nThe following environmental variables are either missing or incorrectly setup:'.red);

        missingList.forEach((missing) => {
          term(` ${missing.id}`, `# ${missing.value.description}`.grey);
        });

        term('\nLearn how to create local ENV files at: https://github.com/HackMerced/HackMerced/tree/master/Tomoe#local-environmnet-variables-in-development'.red);
        term('\n');
        process.exit();
      }

      stage.next();
    },
    function installDBAssets(){
      term('Checking for ArangoDB instance...');

      global.db = new Database({
        url: process.env.DB_URI,
      });

      db.listDatabases((err, databaseList) => {
        if(databaseList){
          if(databaseList.includes(databaseName) && fs.existsSync(TOMOE_CONFIG_PATH)){
            term('\nYou cannot re-run installation if you have already established your database, please destroy your database before re-running.'.red);
            return;
          } else if(databaseList.includes(databaseName)){
            // just in case someone fails installing
            term('Cleaning up old failed installations...\n');

            db.dropDatabase(databaseName).then(
              info => {
                stage.next();
              }
            ).catch(err => {
              term(err.stack.red)
            })
            return;
          }

          // no conflicts (fresh new database)
          stage.next();

          return;
        }

        term('\nTomoe Installer cannot access your ArangoDB database...make sure your server is on and connection URI is properly setup!\n'.red);
      });
    },
    function createDatabase(){
      db.createDatabase(databaseName).then(
        info => {
          db.useDatabase(databaseName);

          createCollections().then(() => {
            db.listCollections().then(() => {
              stage.next();
            }).catch(err => {
              term(err.red);
            })
          }).catch(err => {
            term(err.red);
          })

        },
        err => {
          term(err.stack.red)
        }
      );
    },
    function askHackathonName(){
      divider();
      term('We will ask you a few questions to better configure this service for you.\n');

      storedAnswers.hackathon = readline.question("What is your Hackathon's name?: ".magenta);

      stage.next();
    },
    function askBetaFeatures(){
      let answer = readline.question("\nWould you like to use beta features?".magenta + YESNO_CONTEXT);
          answer = answer.toLowerCase();

      if(['no', 'n'].includes(answer)){
        storedAnswers.beta = false;
      } else if(['yes', 'y'].includes(answer)){
        storedAnswers.beta = true;
      } else {
        stage.same();
        return;
      }

      stage.next();
    },
    function askErrorTrack(){
      let answer = readline.question("\nCan Tomoe occasionally send error information to our servers?".magenta + YESNO_CONTEXT);
        answer = answer.toLowerCase();

      if(['no', 'n'].includes(answer)){
        storedAnswers.errorTrack = false;
      } else if(['yes', 'y'].includes(answer)){
        storedAnswers.errorTrack = true;
      } else {
        stage.same();
        return;
      }

      stage.next();
    },
    function startUserInfo(){
      divider();
      term('Now we will create a user for our GUI:');

      // set adminDetails
      adminDetails = new Admin();
      stage.next();
    },
    function askUserEmail(){


      const email = readline.question("\nWhat is your name?: ".magenta);
      const validate = Joi.validate(email, Joi.string().required()).error;

      if(validate){
        term(createValidationError(validate).red);
        stage.same();
        return;
      }

      adminDetails.setName(email);
      stage.next();
    },
    function askUserEmail(){


      const email = readline.question("\nWhat is your email?: ".magenta);
      const validate = Joi.validate(email, Joi.string().email().required()).error;

      if(validate){
        term(createValidationError(validate).red);
        stage.same();
        return;
      }

      adminDetails.setEmail(email);
      stage.next();
    },
    function askUserPassword(){

      const password = readline.question("\Please set a password (min 6 characters): ".magenta, { hideEchoBack: true });
      const validate = Joi.validate(password, Joi.string().min(6).strip().required()).error;

      if(validate){
        term(createValidationError(validate).red);
        stage.same();
        return;
      }

      adminDetails.setPassword(password);
      stage.next();
    },
    function askUserConfirmPassword(){
      const confirmedPassword = readline.question("\Please confirm your password: ".magenta, { hideEchoBack: true });

      if(adminDetails.confirmPassword(confirmedPassword)){
        stage.next();
        return;
      }

      term('Your passwords do not match!'.red);
      stage.prev();
    },
    function(){
      term('\nAdding you as a user...\n');
      adminDetails.save().then((user) => {
        stage.next();
      },
      (err) => {
        term('There was an error:\n'.red, err);
      });
    },
    function(){
      term('Saving templates...')
      moveFile('email.template.html').then(() => {
        stage.next();
      }).catch((err) => {
        term(err);
      })
    },
    function(){
      term('Saving config...')
      storedAnswers.save().then(() => {
        stage.next();
      }).catch((err) => {
        term(err);
      })
    },
    function(){
      term('Setup Complete!'.green);
      term('\nYou should run the following commands to see Tomoe in action:')
      term('  npm start'.grey)
      term('  npm run api'.grey)
      term('\n') // padding lol
    }
  ]
}


stage.start();
