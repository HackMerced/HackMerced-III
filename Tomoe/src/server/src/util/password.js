export function saltAndHashPassword(pass, resolve){
  function generateSalt(){
      let set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
      let salt = '';
      for (let i = 0; i < 10; i++) {
          let p = Math.floor(Math.random() * set.length);
          salt += set[p];
      }
      return salt;
  }

  let salt = generateSalt();
  let new_pass = (salt + sha256(pass + salt));

  if(resolve){
     resolve(new_pass);
  } else {
    return new_pass;
  }

}

export function passwordValidator(plainPass, hashedPass, resolve){
  if(!hashedPass || util.validate.isFunction(hashedPass)){

    let new_resolve = hashedPass; // since hashPass is our resolve function

    /*
      Password Policies (http://stackoverflow.com/questions/19605150/regex-for-password-must-be-contain-at-least-8-characters-least-1-number-and-bot)

      Minimum 8 charatcters
      /^.{8,}$/

      Minimum 8 characters at least 1 Alphabet and 1 Number:
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

      Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

      Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

      Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/

      Minimum 8 and Maximum 10 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/
    */

    // check if password complies with policy
    let re = /^.{6,}$/;
    let truth = re.test(plainPass);

    if(new_resolve){
      resolve(truth);
    } else {
      return truth;
    }

  } else {
    // check if passwords are both valid with each other

    const salt = hashedPass.substr(0, 10);
    const validHash = salt + sha256(plainPass + salt);

    const truth = (hashedPass === validHash);

    if(resolve){
      resolve(truth); // async
    } else {
      return truth;
    }
  }
}
