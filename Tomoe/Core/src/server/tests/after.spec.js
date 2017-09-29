// this file is only for clean-up mocha tests

import { server } from '../src/server';

after(() => {
  server.stop();
})
