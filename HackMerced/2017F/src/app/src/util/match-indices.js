export function matchIndices(obj1, obj2){
  for(let i in obj1){
    if( obj2[i] ) {
      return true;
    }
  }

  return false;
}
