const getParams = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
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

export {
  addSearch,
  removeSearch,
  getParams
}