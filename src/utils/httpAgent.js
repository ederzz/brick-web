function fetchData(method, url, body) {

  const options = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
      'authorization' : `bearer ${sessionStorage.token}`
    })
  }

  if(method === 'POST') {
    options.body = JSON.stringify(body)
  }

  return fetch(url, options)
    .then(res => res.json())
    .catch(error => error.response && error.response.body ? error.response.body : error)
    .then(response => response);

} // fetchData end

function getUrl (apiRoot,path) {
  return `${apiRoot}${path}`
}


const httpAgent = (apiRoot) => {
  return {
    get: (path) => {
      const url = getUrl(apiRoot,path)
      return fetchData('GET', url)
    },
    post: (path,body) => {
      const url = getUrl(apiRoot,path)
      return fetchData('POST', url, body)
    }
  }
}

export default httpAgent