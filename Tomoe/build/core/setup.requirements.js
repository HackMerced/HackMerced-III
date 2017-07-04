import Joi from 'joi';

export const env = {
  'DB_URI': {
    description: 'URI of your ArangoDB instance'
  },
  'NODE_ENV':{
    description: 'Set to either production or development',
    filter: Joi.string().valid('production', 'development').required()
  }
}

const configNames = {
  development: 'tomoe',
  production: 'tomoe',
  test: 'tomoe-test'
}

const serverNames = {
  development: 'Tomoe_dev',
  test: 'Tomoe_test',
  production: 'Tomoe'
};

const standardDBCollections = [
  'admin', // admin users
  'hacker', // hacker users
  'oauth', // oauth keys information
]

const dbCollections = {
  development: standardDBCollections,
  production: standardDBCollections,
  test: [
    ...standardDBCollections,
    'user-test'
  ]
}

export const Definitions = {
  configName: configNames[process.env.NODE_ENV] + '.config.js',
  server: serverNames[process.env.NODE_ENV],
  userTypes:['admin', 'hacker'],
  apiVersion: '2.0',
  defaultHackerStatuses:[
    'registered',
    'applied',
    'accepted',
    'waitlisted',
    'confirmed',
    'attending',
    'inactive'
  ],
  defaultAdminPermissions: [
    'read',
    'read+write', // read + write
    'admin' // super admin (controls group settings)
  ],
  collections: dbCollections[process.env.NODE_ENV],
  databaseUri: 'http://root:@127.0.0.1:8529',
  build:{
    default: [
      {
        app:{
          dist_folder:"./src/app/src/dist",
          imports:{
            "resources":["../UI/HackMerced-2017-Style/Resources", "scss/resources"]
          },
        }
      }
    ],
    import: false
  }
}
