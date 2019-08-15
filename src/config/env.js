function env() {
  if (process.env.REACT_APP_ENV === 'development') {
    return {
      HOME: 'http://localhost:8080',
      APIROOT:'http://api.b.com',
      PUBLIC_URL: '',
    }
  } else{
    // 生产 process.env.REACT_APP_ENV === 'production'
    return {
      HOME: 'http://www.brickui.com',
      APIROOT:'http://api.brickui.com',
      PUBLIC_URL: '//cdn.brickui.com',
    }
  }
}

export default env()