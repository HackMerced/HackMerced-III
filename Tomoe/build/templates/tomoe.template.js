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
  'volunteer', // volunteer users
  'oauth', // oauth keys information
  'meta', // meta Tomoe information
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
  userTypes:['admin', 'hacker', 'volunteer'],
  apiVersion: '2.0',
  hackerStatuses:[
    'registered',
    'applied',
    'accepted',
    'waitlisted',
    'confirmed',
    'attending',
    'inactive'
  ],
  volunteerStatuses: [
      "applied",
      "denied",
      "approved",
  ],
  adminPermissions: [
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
