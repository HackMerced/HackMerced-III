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
