import crypto from 'crypto';
import fs from 'fs';


import { Definitions } from './setup.requirements';

const TOMOE_CONFIG_PATH = `./${Definitions.configName}.js`

export class Config{
  constructor(params = {}){
    this.hackathon = params.hackathon || '';
    this.beta = params.beta || false;
    this.errorTrack = params.errorTrack || false;
    this.secretKey = params.secretKey || process.env.JWT_SECRET_KEY ||  crypto.randomBytes(64).toString('hex')
    this.database = params.database || Definitions.server;
    this.server = params.server || this.database;
    this.apiVersion = params.apiVersion || Definitions.apiVersion;
    this.userTypes = params.userTypes || Definitions.userTypes;
    this.defaultStatuses = params.defaultStatuses || Definitions.defaultStatuses;
  }

  get(){
    return {
      hackathon: this.hackathon,
      beta: this.beta,
      errorTrack: this.errorTrack,
      secretKey: this.secretKey,
      database: this.database,
      server: this.server,
      apiVersion: this.apiVersion,
      userTypes: this.userTypes,
      defaultStatuses: this.defaultStatuses
    }
  }

  save(){
    return new Promise((resolve, reject) => {
      const configJS = `export Tomoe = ${JSON.stringify(this.get(), null, 4).replace(/"((?:\\.|[^"\\])*)":/g, '$1:')}`;

      fs.writeFile(TOMOE_CONFIG_PATH, configJS, function(err){
        if (err){
          reject(err);
          return;
        }

        resolve()
      });
    })
  }
}
