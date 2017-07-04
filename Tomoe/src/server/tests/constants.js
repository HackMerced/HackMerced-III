export class sampleUser{
  constructor(){
    return {
      name: 'Shubham Naik',
      email: 'shub@hackmerced.com',
      tempPassword: 'testing2',
      newName: 'Shubham D Naik',
      permissions: 'rw',
      details: {
        age: 20
      }
    }
  }
}

export class sampleUser2{
  constructor(){
    return {
      name: 'Jan Tanja',
      email: 'jan@hackmerced.com',
      tempPassword: 'testing3',
      permissions: 'rw',
      details: {
        age: 20
      }
    }
  }
}

export class sampleHacker{
  constructor(){
    return {
      name: 'Steven Dinh',
      email: 'steven@hackmerced.com',
      password: 'testing3',
      confirmPassword: 'testing3',
      status: 'applied',
      details: {
        age: 20
      }
    }
  }
}


export class sampleHacker2{
  constructor(){
    return {
      name: 'Deo Halili',
      email: 'deo@hackmerced.com',
      password: 'testing3',
      confirmPassword: 'testing3',
      status: 'applied',
      details: {
        age: 20
      }
    }
  }
}

export class sampleAdmin{
  constructor(){
    return {
      name: 'Kevin Ta',
      email: 'kevin@hackmerced.com',
      password: 'testing3',
      confirmPassword: 'testing3',
      permissions: 'read'
    }
  }
}


export class sampleAdmin2{
  constructor(){
    return {
      name: 'Sophie Vo',
      email: 'sophie@hackmerced.com',
      password: 'testing4',
      confirmPassword: 'testing4',
      permissions: 'read'
    }
  }
}
