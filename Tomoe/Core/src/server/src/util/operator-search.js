const operatorMap = {
  data: '==',
  gt: '>',
  lt: '<',
  gte: '>=',
  lte: '<='
}

export function operatorSearch(operator){
  return (operatorMap[operator]) ? operatorMap[operator] : '==';
}
