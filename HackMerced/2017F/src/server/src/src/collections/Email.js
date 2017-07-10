import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: TOMOE_CONFIG.email.hostName,
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: TOMOE_CONFIG.email.Username,
        pass: TOMOE_CONFIG.email.password
    }
});

export class Email {
  constructor(data = {}){
    super(data);

  }

  static getCollection(){
    return db.collection('meta');
  }

  static init(){
    this.getCollection().
  }

  _get(){
    return {
      id: this.id,
      name: this.name,
      email:this.email,
      password:this.password,
      permissions: this.permissions
    }
  }
}
