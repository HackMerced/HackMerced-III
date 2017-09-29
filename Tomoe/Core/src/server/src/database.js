import { Database } from 'arangojs';

// connect to database
global.db = new Database({
  url: TOMOE_CONFIG.databaseUri,
  databaseName: TOMOE_CONFIG.databaseName
});
