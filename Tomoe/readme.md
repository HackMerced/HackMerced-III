<img src="./assets/images/logos/logo_blue.png" alt="Tomoe" width=250 >

# Hackathon Application Management API

[![Code Climate](https://codeclimate.com/github/HackMerced/Tomoe/badges/gpa.svg)](https://codeclimate.com/github/HackMerced/Tomoe)
[![Codeship Status for HackMerced/Tomoe](https://codeship.com/projects/37a7fc80-886a-0134-ba24-069b35d31ada/status?branch=master)](https://codeship.com/projects/183931)
[![Test Coverage](https://codeclimate.com/github/HackMerced/Tomoe/badges/coverage.svg)](https://codeclimate.com/github/HackMerced/Tomoe/coverage)

Tomoe is a scalable, open source API that allows Hackathon organizers to manage and monitor their applicants and staff. Tomoe was built for HackMerced's application management but has been extended and open-sourced for everyone. Tomoe is still in development and will be available for use this December.

[Website](http://tomoe.hackmerced.com) |
[Docs](http://tomoe.hackmerced.com/docs) |
[Installation](http://tomoe.hackmerced.com/install) |
[HackMerced](http://hackmerced.com) |
[Sponsor Us!](http://hackmerced.com/sponsor) |
[Blog](https://blog.hackmerced.com/)

# Table of Contents

- [**Features**](#features)
- [**Installation**](#installation)
- [**Documentation**](#documentation)
- [**Resources and Tools**](#resources-and-tools)
- [**Roadmap**](#roadmap)
- [**Contributing**](#contributing)
- [**Support**](#support)
- [**License**](#license)

# Features

- **API**: Tomoe is primarily an API that allows you to build your own UI and interfaces around our platform.
- **Application Manager**: Manage students who apply to your hackathon by approving, denying, generating QR codes for hackers.
- **Email Utility**: Tomoe works with SendGrid to send application statuses, important updates, and other information to hackers.

<br>

<b>[⬆ back to top](#table-of-contents)</b>

# Installation
Tomoe's runs on top of node.js and requires you to install `node.js`, `arangodb`, and `npm`

Once you've installed the prerequistes you will need to run the following command to install your Tomoe instance. It will ask you a few questions to set up a server.

```terminal
npm install
npm run setup
```

Access the server and gui locally at:
```terminal
http://localhost:4925
```

### Local environmnet variables in development
If you do not want to setup environmental variables globally, Tomoe allows you to locally set environmental variables by creating a `.env` file in the root Tomoe directory

```terminal
cd /path/to/tomoe/
touch .env
```

In the `.env` file, you should add the following:
```text
DB_URI={Connection URI of your ArangoDB instance}
MODE={Either DEVELOPMENT or PRODUCTIOn}
```
 <br>

[<b>⬆ back to top](#table-of-contents)</b>

# Documentation
## Shortcuts
[**Hacker Object**](#the-hacker-object)<br>
[**<code>GET</code> /hackers**](#get-hackers)<br>
[**<code>GET</code> /hackers/{user-email}**](#get-hackersuser-email)<br>
[**<code>GET</code> /hackers/{user-id}**](#get-hackersuser-id)<br>
[**<code>POST</code> /hackers**](#post-hackers)<br>
[**<code>POST</code> /hackers/{user-email}**](#post-hackersuser-email)<br>
[**<code>POST</code> /hackers/{user-id}**](#post-hackersuser-id)<br>
[**<code>DELETE</code> /hackers/{user-email}**](#delete-hackersuser-email)<br>
[**<code>DELETE</code> /hackers/{user-id}**](#delete-hackersuser-id)<br>
 <br>

<b>[⬆ back to top](#table-of-contents)</b>

## The Hacker Object
The Hacker Object is the core to Tomoe's hackathon management system. Hackers are the people who apply to your hackathon.
```javascript
{
 "_id":"user-id",
 "name":"user-name",
 "email":"hackathon@email.com",
 "password":"userpasswordhash", // not returned normally
 "status":"applied", // applied, denied, approved, waitlisted
 "survey":{
    ... // array of attributes that can be customized and sent to the user
 }
}
```
<br>

<b>[⬆ back to top](#table-of-contents)</b>
<b>- [back to documentation](#documentation)</b>
### <code>GET</code> /hackers<br>
Lists all hackers stored in your database

#### Parameters
* <code>survey.data.{option}={any-data}</code> <br>**optional** : will filter the hackers returned based on a particular survey data
<br><br>
* <code>survey.lte.{option}={numeric-data}</code> <br>**optional** : will filter for a range of options that are less than the entered value
<br><br>
* <code>survey.gte.{option}={numeric-data}</code> <br>**optional** : will filter for a range of options that are greater than the entered value
<br><br>
* <code>survey.rangemin.{option}={numeric-data}</code> <br>**optional** : will filter for a range of options, sets the min value
<br><br>
* <code>survey.rangemax.{option}={numeric-data}</code> <br>**optional** : will filter for a range of options, sets the max value

#### Example 1
```
GET https://{your-tomoe-server}/v1.0/hackers
```

##### Response
```js
Array [
 {
  "_id":"349mei8234",
  "name":"John Mallon",
  "email":"john@ucmerced.edu",
  "survey":{
   "age":22,
   "college_origin":"University of California-Merced"
  }
 },
 ...
 {
  "_id":"934554",
  "name":"Bob Brown",
  "email":"bbrown@ucmerced.edu",
  "survey":{
   "age":18,
   "college_origin":"University of California-Los Angeles"
  }
 },
]
```

#### Example 2
```
GET https://{your-tomoe-server}/v1.0/hackers?survey.rangemin.age=22&survey.rangemax.age=25&survey.data.college_origin=University of California-Merced
```
##### Response
```js
Array [
 {
  "_id":"349mei8234",
  "name":"John Mallon",
  "email":"john@ucmerced.edu",
  "survey":{
   "age":22,
   "college_origin":"University of California-Merced"
  }
 },
 ...
 {
  "_id":"934554",
  "name":"Karl Korn",
  "email":"kkorn@ucmerced.edu",
  "survey":{
   "age":25,
   "college_origin":"University of California-Merced"
  }
 },
]
```
<br>

<b>[⬆ back to top](#table-of-contents)</b>
<b>- [back to documentation](#documentation)</b>

### <code>GET</code> /hackers/{user-email}
### <code>GET</code> /hackers/{user-id}
Returns a particular hackathon hacker, requires one of the previous parameters

#### Example
```
GET https://{your-tomoe-server}/v1.0/hackers/john@ucmerced.edu
```

##### Response
```js
{
 "_id":"349mei8234",
 "name":"John Mallon",
 "email":"john@ucmerced.edu",
 "survey":{
  "age":22,
  "college_origin":"University of California-Merced"
 }
}
```
<br>

<b>[⬆ back to top](#table-of-contents)</b>
<b>- [back to documentation](#documentation)</b>

### <code>POST</code> /hackers
Creates a hacker user
#### Example
```
POST https://{your-tomoe-server}/v1.0/hackers
```
```
CONTENT-TYPE: application/json
BODY: {
 "name":"Shubham Naik",
 "email":"snaik3@ucmerced.edu",
 "survey":{
  "age":19,
  "college_origin":"University of California-Merced"
 }
}
```

##### Response
```js
{
 "_id":"5340424",
 "name":"Shubham Naik",
 "email":"snaik3@ucmerced.edu",
 "survey":{
  "age":19,
  "college_origin":"University of California-Merced"
 }
}
```
<br>
<b>[⬆ back to top](#table-of-contents)</b>
<b>- [back to documentation](#documentation)</b>

### <code>POST</code> /hackers/{user-email}
### <code>POST</code> /hackers/{user-id}
Updates a particular hackathon hacker, requires one of the previous parameters

#### Example
```
GET https://{your-tomoe-server}/v1.0/hackers/snaik3@ucmerced.edu
```
```
CONTENT-TYPE: application/json
BODY: {
 "name":"Shubham D Naik",
 "survey":{
  "age":20,
 }
}
```

##### Response
```js
{
 "_id":"349mei8234",
 "name":"Shubham D Naik",
 "email":"snaik3@ucmerced.edu",
 "survey":{
  "age":20,
  "college_origin":"University of California-Merced"
 }
}
```
<br>

<b>[⬆ back to top](#table-of-contents)</b>
<b>- [back to documentation](#documentation)</b>

### <code>DELETE</code> /hackers/{user-email}
### <code>DELETE</code> /hackers/{user-id}
Deletes a particular hackathon hacker, requires one of the previous parameters

#### Example
```
DELETE https://{your-tomoe-server}/v1.0/hackers/john@ucmerced.edu
```

##### Response
```js
{ deleted: true }
```
<br>

<b>[⬆ back to top](#table-of-contents)</b>
<b>- [back to documentation](#documentation)</b>


# Contributing
Want to contribute to Tomoe? We would love if you were to contribute to the continued growth of our project. Just submit a branch request - if you're a UC Merced student, please [contact us](shub@hackmerced.com)! We're still looking to add developers to our mentorship program too!

<br>

<b>[⬆ back to top](#table-of-contents)</b>




# Support
The HackMerced Team is happy to help Hackathon organizers with setting up and configuring your application. Email us at [help@hackmerced.com](help@hackmerced.com).

<br>

<b>[⬆ back to top](#table-of-contents)</b>

# License
```
Copyright 2016 HackMerced

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
<br>

<b>[⬆ back to top](#table-of-contents)</b>
