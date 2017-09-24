import axios from 'axios';

const BASE_URI = (process.env.NODE_ENV === 'development') ? 'http://localhost:' + (process.env.PORT || 1954) : '';

export const auth = {
  saveUser(response, resolve) {
    const user = response.data.results;
    localStorage.token = response.data.meta.token;
    localStorage.userName = user.name;
    localStorage.userId = user.id;

    resolve(user);
  },
  login(user) {
    return new Promise((resolve, reject) => {
      if (this.loggedIn()) {
        resolve();
        return;
      }

      let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Accept', 'application/json');

      axios.post(BASE_URI + '/login', user)
      .then((response) => {
        auth.saveUser(response, resolve);
      })
      .catch((error) => {
        reject(error.response.data);
      });
    })
  },
  fetchUser() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: BASE_URI + '/me',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then((response) => {
        const user = response.data.results;

        localStorage.userName = user.name;

        resolve(user);
      })
      .catch((error) => {
        reject(error.response.data);
      });
    })
  },
  updateUser(details) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: BASE_URI + '/me',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        },
        data: {
          details: details
        }
      })
      .then((response) => {
        const user = response.data.results;
        localStorage.userName = user.name;
        resolve(user);
      })
      .catch((error) => {
        reject(error.response.data);
      });
    })
  },
  submitVolunteerApplication(details) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: BASE_URI + '/volunteer',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        },
        data: details,
      })
      .then(response => {
        const user = response.data.results;
        resolve(user);
      })
      .catch(error => {
        reject(error.response.data);
      });
    })
  },
  submitApplication(details) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: BASE_URI + '/submit',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        },
        data: details,
      })
      .then((response) => {
        const user = response.data.results;
        resolve(user);
      })
      .catch((error) => {
        reject(error.response.data);
      });
    })
  },
  submitVolunteerApplication(details) {
    return new Promise((resolve, reject) => {
      console.log(BASE_URI + '/volunteer')
      axios({
        method: 'post',
        url: BASE_URI + '/volunteer',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        },
        data: details
      })
      .then((response) => {
        const user = response.data.results;
        resolve(user);
      })
      .catch((error) => {
        console.log(error)
        reject(error.response.data);
      })
    })
  },
  logout(callback) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
          headers.append('Content-Type', 'application/json');

      axios.post(BASE_URI + '/logout')
      .then((response) => {
        localStorage.removeItem('token');
        resolve();
      })
      .catch((error) => {
        reject(error.response.data);
      });

    })
  },
  loggedIn() {
    return !!localStorage.token;
  },
  userName() {
    return localStorage.userName;
  },
  userId() {
    return localStorage.userId;
  },
  signup(user) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Accept', 'application/json');
      axios.post(BASE_URI + '/signup', user)
      .then((response) => {
        auth.saveUser(response, resolve);
      })
      .catch((error) => {
        reject(error.response.data);
      });
    })
  },
  onChange() {}
}
