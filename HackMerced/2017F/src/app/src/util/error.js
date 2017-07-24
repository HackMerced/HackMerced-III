export function getErrorCount(errors){

  let errorCount = 0;

  for(let i in errors){
    const data = errors[i];

    if(data){
      errorCount++;
    }
  };

  return errorCount;
}

export function parseError (key, message){
  const errorKeyMap = {
    'github': 'Please properly format your github profile link (ex: https://github.com/username)',
    'linkedin': 'Please properly format your linkedin profile link (ex: https://linkedin.com/in/username)',
    'devpost': 'Please properly format your devpost profile link (ex: https://devpost.com/username)',
    mlh: 'Your application will be rejected if you do not accept our code of conduct!'
  }

  const errorMessageMap = {
    'confirmPassword is required': 'Please confirm your password!'
  }

  return errorKeyMap[key] || errorMessageMap[message] || message.replace(/_/g, ' ') + '!';
}
