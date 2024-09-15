export function enCode(query:string){
  return JSON.stringify(encodeURI(query))
}

export function deCode(receive:string){
  return JSON.parse(decodeURI(receive))
}