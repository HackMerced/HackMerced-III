export function respond(data, meta = {}, statusCode = 200){
  return {
    statusCode: statusCode,
    meta: meta,
    results: data
  }
}
