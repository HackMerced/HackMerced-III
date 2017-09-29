import uuidv4 from 'uuid/v4'

export class Event {
  constructor({ id = uuidv4(), date = null }){
    this.id = id;
    this.date = date;
  }

  static getCollection(){
    return db.collection('event');
  }

  _get(){
    return {
      id: this.id,
      date: this.date,
    }
  }
}
