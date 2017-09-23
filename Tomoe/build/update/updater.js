/*
  This code will upgrade the Tomoe.config.js and Arangodb without destroying the database/your updates
*/
import packageDetail from '../../package.json';
import { Config } from '../core/config';
import { Definitions } from '../templates/tomoe.template';
import { Database } from 'arangojs';
import { createCollections } from '../util'


const term = console.log; // easier to type

export function updateConfig() {
  term(`Updating tomoe.config.js`);

  let config = new Config(Config.current());

  for(let option in Definitions) {
    if(!config[option]) {
      config[option] = Definitions[option];
    }
  }

  config.save();
}

export function updateCollections() {
  global.db = new Database({
    url: process.env.DB_URI,
  });

  db.useDatabase(Definitions.server);

  createCollections().then(() => {

  }).catch(err => {
    term(err);
  })
}

export function TomoeUpdate() {
  term(`Upgrading Tomoe to version ${packageDetail.version}`);

  updateConfig();
  updateCollections();
}

TomoeUpdate();
