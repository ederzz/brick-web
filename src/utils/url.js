const getParams = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

const addSearch = (name, value) => {
  const search = window.location.search
  if (search) {
    if (search.indexOf(`${name}=`) !== -1) {
      return search.replace(new RegExp(`${name}=.+(?=\&)|${name}=.+`), `${name}=${value}`)
    } else {
      return `${search}&${name}=${value}`
    }
  } else {
    return `?${name}=${value}`
  }
}

const removeSearch = (name) => {
  const search = window.location.search
  if (search) {
    if (search.indexOf(`${name}=`) !== -1) {
      return search.replace(new RegExp(`${name}=.+?\&|[\&\?]${name}=[^\&]+?$`), '')
    }else{
      return search
    }
  } else {
    return ''
  }
}

const jsonToUrl = (json) => {
  let code = json
  code = code.replace(/\/\/.*/g, "")
  code = code.replace(/\s/g, "")
  code = code.replace(/[a-zA-Z0-9]+(?=:)/g,'"$&"')
  code = code.replace(/'/g,'"')

  return code
}

export {
  addSearch,
  removeSearch,
  getParams,
  jsonToUrl
}