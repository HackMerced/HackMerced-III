import { aql } from 'arangojs';

export function clearDocuments(collection){
  return new Promise((resolve, reject) => {
    const removeQuery = aql`FOR u in ${collection}
                                REMOVE u IN ${collection}`

    db.query(removeQuery).then((meta) => {
      resolve()
    }).catch((err) => {
      reject(err);
    })
  })
}
