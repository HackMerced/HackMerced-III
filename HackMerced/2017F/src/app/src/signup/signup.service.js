import axios from 'axios';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {

    return response
  } else {
    throw response
  }
}


export class SignupService{
  static createUser(user){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      axios.post('http://localhost:1954/signup', user)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response.data);
      });

    })

  }
}
