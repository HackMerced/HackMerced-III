const config = {
  apiVersion: '/2.0/',
  hackathon: process.env.HACKATHON || 'default',
  statusTypes: [
    'registered',
    'in-progress',
    'applied',
    'accepted',
    'confirmed',
    'attending'
  ]
}

export API_VERSION = config.apiVersion;
export HACKATHON = config.hackathon;
export STATUS_TYPES = config.statusTypes;
