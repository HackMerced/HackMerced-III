import crypto from 'crypto';
import fs from 'fs';


import { Definitions } from './setup.requirements';

const TOMOE_CONFIG_PATH = `./${Definitions.configName}`

export class Config{
  constructor(params = {}){
    this.hackathon = params.hackathon || '';
    this.beta = params.beta || false;
    this.errorTrack = params.errorTrack || false;
    this.secretKey = params.secretKey || process.env.JWT_SECRET_KEY ||  crypto.randomBytes(64).toString('hex')
    this.databaseName = params.databaseName || Definitions.server;
    this.databaseUri = params.databaseName || process.env.DB_URI ||  Definitions.databaseUri;
    this.server = params.server || this.database;
    this.apiVersion = params.apiVersion || Definitions.apiVersion;
    this.userTypes = params.userTypes || Definitions.userTypes;
    this.hackerStatuses = params.hackerStatuses || Definitions.defaultHackerStatuses;
    this.build = params.build || ((fs.existsSync('../.hackmerced')) ? Definitions.build.default : Definitions.build.import)
    this.adminPermissions = params.adminPermissions || Definitions.defaultAdminPermissions;
  }

  get(){
    return {
      hackathon: this.hackathon,
      beta: this.beta,
      errorTrack: this.errorTrack,
      secretKey: this.secretKey,
      databaseName: this.databaseName,
      databaseUri: this.databaseUri,
      server: this.server,
      apiVersion: this.apiVersion,
      userTypes: this.userTypes,
      hackerStatuses: this.hackerStatuses,
      adminPermissions: this.adminPermissions
    }
  }

  save(){
    return new Promise((resolve, reject) => {
      const configJS = `exports.Tomoe = ${JSON.stringify(this.get(), null, 4).replace(/"((?:\\.|[^"\\])*)":/g, '$1:')}`;

      fs.writeFile(TOMOE_CONFIG_PATH, configJS, function(err){
        if (err){
          reject(err);
          return;
        }

        resolve()
      });
    })
  }

  delete(){
    fs.unlink(TOMOE_CONFIG_PATH);
  }
}
