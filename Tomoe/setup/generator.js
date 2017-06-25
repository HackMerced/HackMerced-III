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
import packageDetail from '../package.json';
import colors from 'colors';
import readline from 'readline';
import { env, Definitions } from './setup.requirements';
import {Database, aql} from 'arangojs';
import Joi from 'joi';

const term = console.log; // easier to type

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let storedAnswers = {
  hackathon:"",
}


const stage = [
    function introduction(){
      term('\n====================================');
      term(figlet.textSync('Tomoe'));
      term('====================================\n');
      term(`You are running the installer for Tomoe v${packageDetail.version}\n`.green);
      stage[1]();
    },
    function checkEnv(){
      term('Checking for environmental variables...');

      let missingList = [];

      for(let req in requirements){
        const reqData = requirements[req];



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

        term('\n');
        process.exit();
      }

      stage[2]();
    },
    function(){
      rl.question("What is your Hackathon's name?", (answer) => {
        rl.close();
        stage[3]();
      });
    },
    function installDBAssets(){
      term('Checking for ArangoDB instance...');

      const db = new Database({
        url: process.env.DB_URI,
        databaseName: Definitions.server[process.env.MODE]
      });

      const collection = db.collection('hackers');

      stage[4]();
    },

    function(){
    }
]


stage[0]();
