import { Definitions } from './setup.requirements';

export function createCollections(additionalCollections = []){
  return new Promise((resolve, reject) => {
    const collections = Definitions.collections.concat(additionalCollections);
    let error = '';
    collections.forEach((collectionName) => {
      db.collection(collectionName).create().then(
        () => { },
        (err) => {

          error = err;
          return;
        }
      )
    });

    if(error){
      reject(error);
      return;
    }

    resolve();
  });
}
