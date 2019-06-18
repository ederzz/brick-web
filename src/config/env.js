function env() {
  if (process.env.REACT_APP_ENV === 'development') {
    return {
      APIROOT:'http://api.b.com',
    }
  } else{
    // 生产 process.env.REACT_APP_ENV === 'production'
    return {
      APIROOT:'http://api.brickui.com',
    }
  }
}

export default env()