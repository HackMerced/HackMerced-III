const transformMap = {
  data: function(value){
    return value
  },
  number: function(value){
    return parseFloat(value)
  },
}

export function transformData(operator, value){
  return (transformMap[operator]) ? transformMap[operator](value) : transformMap['data'](value);
}
