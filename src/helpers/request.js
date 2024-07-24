

export const peticion = (endpoint, method, data, headers = {}) =>{
    const baseUrl = `${endpoint}`;
  console.log(data);
  console.log(headers);
    return fetch(baseUrl,{
        method : method,
        headers: {
            'Accept':'*/*',
            'Content-Type': 'application/json', 
            "Accept-Encoding": "gzip, deflate, br" 
        },
        body:JSON.stringify(data),
        ...headers,
    })
}

export const peticionGET = (endpoint, method, headers = {}) => {
    const baseUrl = `${endpoint}`;
    return fetch(baseUrl, {
      method: method,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        ...headers, 
      },
    });
  }
  