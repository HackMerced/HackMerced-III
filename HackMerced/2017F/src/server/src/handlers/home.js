import Path from 'path';
const INDEX_URI = Path.join(__dirname, '../../../app/dist/index.html');

export const homeHandlers = {
  home: (req, reply) => {
    return reply.file(INDEX_URI, {
      confine: false
    });
  },
  static: (req, reply) => {
    let url = '';
    if(req.params.filename.includes('.')){
      url = Path.join(__dirname, '../../../app/dist/' + req.params.filename);
    } else {
      url = INDEX_URI;
    }

    return reply.file(url, {
      confine: false
    });
  },
}
