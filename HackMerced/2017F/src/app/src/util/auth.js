import axios from 'axios';


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

      axios.post('http://localhost:1954/login', user)
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
        url: 'http://localhost:1954/me',
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
        url: 'http://localhost:1954/me',
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
  submitApplication(details) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'http://localhost:1954/submit',
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
  logout(callback) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
          headers.append('Content-Type', 'application/json');

      axios.post('http://localhost:1954/logout')
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

      axios.post('http://localhost:1954/signup', user)
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
